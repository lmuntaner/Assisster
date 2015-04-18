# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )

%w( patients doctors doctor_web_settings ).each do |controller|
  Rails.application.config.assets.precompile += ["#{controller}.js", "#{controller}.css"]
end

Rails.application.config.assets.precompile += %w( js_home_template/portfolio/lib/jquery-1.9.0.min.js
													js_home_template/portfolio/source/jquery.fancybox.js
													js_home_template/portfolio/source/helpers/jquery.fancybox-media.js
													js_home_template/portfolio/jquery.isotope.js
													js_home_template/iosslider/_src/jquery.iosslider.js
													js_home_template/iosslider/_lib/jquery.easing-1.3.js
													js_home_template/iosslider/_src/custom.js
													js_home_template/jquery.scrollto.min.js
													js_home_template/jquery.nav.js
													js_home_template/main.js
													js_home_template/mainmenu/jquery-1.7.1.min.js
													js_home_template/jcarousel/jquery.jcarousel.min.js
													js_home_template/revolutionslider/rs-plugin/js/jquery.themepunch.revolution.min.js
													js_home_template/sticky-menu/core.js )

