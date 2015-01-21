desc "This task is called by the Heroku scheduler add-on"

task :send_email_reminders => :environment do
  User.send_email_reminders
end