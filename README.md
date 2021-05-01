# Sigfox MKRFox1200 sending temperature to thethings.iO

This is the code needed during the session made by Marc Pous (me) at the Master of the Internet of Things at UPC.

This code has been used the 4th of March 2019 and the 4th of May 2021.

## Equipment needed

* Arduino MKRFox 1200
* Arduino IDE [here](https://www.arduino.cc/en/software)
* Sigfox License [here](https://backend.sigfox.com/)
* thethings.iO free account [here](https://panel.thethings.io/)

## Getting started

### Arduino

Open the Arduino IDE installed on your computer and create a new project.

Copy and Paste [this code](https://github.com/mpous/Master-IoT-UPC-Arduino-Sigfox-thethingsiO/blob/master/Arduino-MKRFox1200-temperature.ino) on the IDE and compile it.

### Sigfox

Go to the [Sigfox backend](https://backend.sigfox.com/) and log in. Create a Device Type and connect your Sigfox thing with the ID and PAC number.

### thethings.iO

Create a [thethings.io account](https://thethings.io). Go to create a Sigfox Product via Things Manager (select Sigfox).

Click Details on the created Product and find the Callback URL on the Product Details. Copy it.

### Sigfox

Go back to the [Sigfox backend](https://backend.sigfox.com/). 

Go to the Device Type and click create a Custom Callback.

Paste the thethings.iO Callback URL at the ```Url pattern``` textbox as a POST (Data and Uplink).

### thethings.iO

Once the device start sending data via Sigfox, the thing will be automagically created on thethings.iO IoT platform.

When a Sigfox product is created, automagically a Sigfox function (on Cloud Code) is created. This is a gateway function that enables developers to convert the 12 bytes from Sigfox into thethings.iO resources (plus add more business logics).

Create the Sigfox Parser based on the code you can find [here](https://github.com/mpous/Master-IoT-UPC-Arduino-Sigfox-thethingsiO/blob/master/sigfox_parser.js).

Now you are ready to create dashboards and more.
