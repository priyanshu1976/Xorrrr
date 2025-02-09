#include <Wire.h>
#include <SPI.h>
//#include <LoRa.h>
#include <TinyGPSPlus.h>
#include <SoftwareSerial.h>

#define SLAVE_ADDR 9
#define RXPin 1   // GPS RX (Connect to GPS TX)
#define TXPin 0  // GPS TX (Connect to GPS RX)
#define GPSBaud 9600

#define SS 10   // LoRa NSS
#define RST 9   // LoRa Reset
#define DIO0 2  // LoRa DIO0

// SENSOR PINS
#define TRIG_PIN1 5
#define ECHO_PIN1 6//ultrasonic 1
#define TRIG_PIN2 7
#define ECHO_PIN2 8//ultrasonic 2
#define INFRARED 12//infrared
#define FLAME A0//flame
#define WATER 11//water
#define TILT 13//tilt

// VARIABLES
int motor_state = 1;
long time1, time2;
float distance1, distance2, water_read, flame_read, tilt_read;
TinyGPSPlus gps;
SoftwareSerial gpsSerial(RXPin, TXPin);  // GPS Serial

void setup() {
  Wire.begin();

    Serial.begin(9600);
    gpsSerial.begin(GPSBaud);

    // LoRa INIT
    LoRa.setPins(SS, RST, DIO0);
    if (!LoRa.begin(433E6)) {
        Serial.println("LoRa failed!");
        while (1);
    }
    Serial.println("LoRa Ready.");

    // SENSOR INIT
    pinMode(TRIG_PIN1, OUTPUT);
    pinMode(ECHO_PIN1, INPUT);
    pinMode(TRIG_PIN2, OUTPUT);
    pinMode(ECHO_PIN2, INPUT);
    pinMode(INFRARED, INPUT);
    pinMode(WATER, INPUT);
    pinMode(TILT, INPUT);
}

void readSensors() {
    // ULTRASONIC SENSOR
    digitalWrite(TRIG_PIN1, LOW);
    delayMicroseconds(2);
    digitalWrite(TRIG_PIN1, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIG_PIN1, LOW);
    
    digitalWrite(TRIG_PIN2, LOW);
    delayMicroseconds(2);
    digitalWrite(TRIG_PIN2, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIG_PIN2, LOW);

    time1 = pulseIn(ECHO_PIN1, HIGH);
    time2 = pulseIn(ECHO_PIN2, HIGH);

    distance1 = (time1 * 0.0344) / 2;
    distance2 = (time2 * 0.0344) / 2;

    // SAFETY CHECKS
    /*if (distance1 <= 10 || distance2 <= 10){
      motor_state = 0;
      Serial.println("RADD is not running");
    }
    else{
       motor_state = 1;
       Serial.println("RADD is runinng");
    }

    if (digitalRead(INFRARED) == HIGH){//infrared
      Serial.println("RADD is not running");
    }
    if (digitalRead(WATER) == 1) {//water
      Serial.println("RADD is not running");
    } 
    flame_read = analogRead(FLAME);
    if (flame_read <= 50) {
        Serial.println("Flames detected!");
        Serial.println("RADD is not running");
    }

    tilt_read = digitalRead(TILT);
    if (tilt_read == HIGH) {
        Serial.println("Tilt detected!");
        motor_state = 0;
    }*/
}

void sendMotorState() {
    Wire.beginTransmission(SLAVE_ADDR);
    Wire.write(motor_state);
    Wire.endTransmission();
}

void loop() {
    /*readSensors();
    sendLoRaData();*/
   Serial.print("Motor State: ");
    Serial.println(motor_state);
    //delay(2000);
}

