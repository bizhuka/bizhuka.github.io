# frozen_string_literal: true

require "json"
require "net/http"
require "uri"

module XttGeneratorData
  class Loader
    USER_AGENT = "bizhuka.github.io Jekyll build"

    def self.request_json(url, allow_not_found: false)
      uri = URI(url)
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = uri.scheme == "https"
      http.open_timeout = 5
      http.read_timeout = 15

      request = Net::HTTP::Get.new(uri)
      request["User-Agent"] = USER_AGENT
      response = http.request(request)

      return nil if allow_not_found && response.code == "404"

      unless response.is_a?(Net::HTTPSuccess)
        raise "#{uri} returned HTTP #{response.code}"
      end

      JSON.parse(response.body)
    end

    def self.available_api(config)
      production_url = config.fetch("production_base_url")
      candidates = if Jekyll.env == "production"
                     [production_url]
                   else
                     [config.fetch("local_base_url"), production_url]
                   end

      candidates.each do |base_url|
        examples = request_json("#{base_url}/api/examples")
        return [base_url, examples]
      rescue StandardError => e
        Jekyll.logger.warn "XTT generator:", "#{e.message}; trying the next host"
      end

      raise "No configured XTT generator API is available"
    end

    def self.load(site)
      config = site.config.fetch("xtt_generator")
      base_url, examples = available_api(config)
      site_demo_ids = Array(site.data["xtt_demo"]).filter_map { |demo| demo["ID"] }.uniq
      api_demo_ids = Array(examples).filter_map { |example| example["ind"] }
      demo_ids = site_demo_ids & api_demo_ids
      generator_pairs = demo_ids.each_slice(8).flat_map do |batch|
        batch.map do |demo_id|
          Thread.new do
            query = URI.encode_www_form(ind: demo_id)
            metadata = request_json("#{base_url}/api/example?#{query}", allow_not_found: true)
            next unless metadata

            [demo_id, {
              "row_count" => metadata["row_count"] == true,
              "column_count" => metadata["colum_count"] == true,
              "block_count" => metadata["block_count"] == true,
              "templates" => Array(metadata["templates"]).filter_map do |template|
                template.is_a?(Hash) ? template["objid"] : template
              end
            }]
          end
        end.map(&:value)
      end
      generator_data = generator_pairs.compact.to_h

      config["base_url"] = base_url
      site.data["xtt_generator"] = generator_data
      Jekyll.logger.info "XTT generator:", "loaded #{generator_data.length} demos from #{base_url}"
    end
  end
end

Jekyll::Hooks.register :site, :post_read do |site|
  XttGeneratorData::Loader.load(site)
end
