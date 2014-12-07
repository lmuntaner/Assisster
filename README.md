#Assisster
===============

A project to help doctors handle their calendar of appointments. Allowing the patients to make online appointments.

The doctor's dashboard is in real time, when a new patient makes an appointment the doctor doesn't need to refresh the page. This way the page can be always open for the doctor and there won't be any overlapping of hours after refreshing.

I used pusher.com to create the realtime listeners. It's pretty cool because with only one listener I update all the different pages in the website. The calendar, the dashboard home and all the appointments. I created the listener in the router, updating the collection of appointments. The rest of the views are listening the changes in this collection. Not directly to the server.

Check it out in [www.randomdoctor.com](http://www.randomdoctor.com)

### Home page
![home page](https://raw.githubusercontent.com/lmuntaner/assisster/master/app/assets/images/screenshot_home.png)

### Dashboard Home
![dashboard home](https://raw.githubusercontent.com/lmuntaner/assisster/master/app/assets/images/screenshot_dashboard_home.png)

### Doctor's Calendar
I used the FullCalendar jQuery plugin
![calendar](https://raw.githubusercontent.com/lmuntaner/assisster/master/app/assets/images/screenshot_calendar.png)

### Patients site to create appointments
![patient appointment](https://raw.githubusercontent.com/lmuntaner/assisster/master/app/assets/images/screenshot_patient_appointment.png)
