#include<Wire.h>
#include<TinyGPSPlus.h>

#define SLAVE_ADDR 9

#define RXPin 1   //GPS
#define TXPin 0
#define GPSBaud 9600

//PINOUTS ARE DEFINED
int trig_pin1=2;//FIRST ULTARSONIC 
int echo_pin1=3;//FIRST ULTARSONIC 
int trig_pin2=4;//SECOND ULTRASONIC
int echo_pin2=5;//SECOND ULTRASONIC
int infrared=6;
int flame=;
int water=;
int tilt_value=;


//EXTRA VARIABLES
int motor_read=0;
long time1,time2;//1 FOR FIRST AND 2 FOR SECOND RESPECTIVELY ULTRASONIC SENSOR
float distance1,distance2;

TinyGPSPlus gps;
HardwareSerial gpsSerial(1);

void setup() {
  pinMode(trig_pin1,OUTPUT);
  pinMode(trig_pin2,OUTPUT);
  pinMode(echo_pin1,INPUT);
  pinMode(echo_pin2,INPUT);//ULTRASONIC SENSOR

  pinMode(infrared,INPUT);//INFRARED SENSOR

 
  Wire.begin(SLAVE_ADDR);
  Wire.onRequest(motor_reading);

  Serial.begin(9600);

  gpsSerial.begin(GPSBaud, SERIAL_8N1, RXPin, TXPin); // GPS communication
}

void Value_for_sensors(){
  //ULTRASONIC SENSOR
  digitalWrite(trig_pin1,LOW);//FIRST ULTARSONIC SENSOR
  delay(2);
  digitalWrite(trig_pin1,HIGH);
  delay(10);
  digitalWrite(trig_pin1,LOW);
  digitalWrite(trig_pin2,LOW); //SECOND ULTRASONIC SESNOR
  delay(2);
  digitalWrite(trig_pin2,HIGH);
  delay(10);
  digitalWrite(trig_pin2,LOW);

  time1=pulseIn(echo_pin1,HIGH);
  time2=pulseIn(echo_pin2,HIGH);

  distance1=(time1*0.0344)/2;
  distance2=(time2*0.0344)/2;
  if(distance1 <=30 || distance2<=30){
    Serial.print("TRACK DEFECTED");
    motor_read=0;
  }
  else{
    motor_read=1;
  }

  //INFRARED SESNOR
  if(digitalRead(infrared)==HIGH){
    motor_read=0;
  }
  else {
    motor_read=1;
  }

}

void motor_reading(){
  Value_for_sensors();
  Wire.write(motor_read);
}

void loop() {
  while (gpsSerial.available() > 0) {
    char c = gpsSerial.read();
    Serial.write(c);  // Debug: Show raw GPS data
    if (gps.encode(c)) {  // Parse GPS data
      if (gps.location.isUpdated()) {
        Serial.print("Latitude: ");
        Serial.print(gps.location.lat(), 6);
        Serial.print(", Longitude: ");
        Serial.println(gps.location.lng(), 6);
      }
    }
  }

  if (millis() > 5000 && gps.charsProcessed() < 10) {
    Serial.println("Waiting for GPS signal...");
  }
}


