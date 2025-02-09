 #include <Wire.h>

#define MOTOR_PWM1 11
#define MOTOR_PWM2 10   // PWM pin for speed control
#define MOTOR_DIR1 7   // Direction pin 1
#define MOTOR_DIR2 6 
#define MOTOR_DIR3 5  // Direction pin 2
#define MOTOR_DIR4 4

int speed = 100;
int motor_state = 0; // Default state OFF

void setup() {
    Wire.begin(9); // Slave address
    Wire.onReceive(receiveEvent);

    pinMode(MOTOR_PWM1, OUTPUT);
    pinMode(MOTOR_DIR1, OUTPUT);
    pinMode(MOTOR_DIR2, OUTPUT);
    pinMode(MOTOR_PWM2, OUTPUT);
    pinMode(MOTOR_DIR3, OUTPUT);
    pinMode(MOTOR_DIR4, OUTPUT);

    Serial.begin(9600);
    Serial.println("Slave Ready.");
}

void receiveEvent(int bytes) {
    if (Wire.available()) {
        motor_state = Wire.read();
        Serial.print("Received Motor State: ");
        Serial.println(motor_state);
    }
}

void loop() {
    if (motor_state == 1) {
        digitalWrite(MOTOR_DIR1, LOW);
        digitalWrite(MOTOR_DIR2, HIGH);
        analogWrite(MOTOR_PWM1, speed);
        digitalWrite(MOTOR_DIR3, LOW);
        digitalWrite(MOTOR_DIR4, HIGH);
        analogWrite(MOTOR_PWM2, speed); // Speed (0-255)
        Serial.println("Motor Running");
    } else {
        digitalWrite(MOTOR_DIR1, LOW);
        digitalWrite(MOTOR_DIR2, LOW);
        analogWrite(MOTOR_PWM1, speed);
        digitalWrite(MOTOR_DIR3, LOW);
        digitalWrite(MOTOR_DIR4, LOW);
        Serial.println("Motor Stopped");
    }
}

