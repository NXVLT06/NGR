export interface Project {
  id: string;
  num: string;
  title: string;
  subtitle?: string;
  hasVR?: boolean;
  video?: string;
  category: string;
  year: string;
  abstract: string;
  overview: string;
  problem: string;
  objective: string;
  systemConcept: string;
  components: string[];
  techStack: string[];
  workflow: string[];
  result: string;
  status: string;
  circuitType: 'rocket' | 'iot' | 'security' | 'discrete' | 'satellite' | 'rfid' | 'automotive' | 'hid' | 'biometric' | 'signal';
  codeSnippet: string;
  metrics: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    id: "proj-01",
    num: "01",
    title: "Microcontroller-Based Rocket Stage & Launch Sequence Simulator",
    subtitle: "Automated Launch Sequence & Telemetry Test Bench",
    category: "Embedded Systems / Automation",
    year: "2024",
    abstract: "An automated test bench and exhibit controller that synchronizes visual telemetry, dynamic audio, motor spooling, and dual-stage relay actuation across an automated launch countdown sequence upon a single push-button trigger.",
    overview: "A mission-critical launch sequence simulation platform combining real-time hardware timers, multi-stage relay controllers, auditory feedback, and LCD telemetry. Designed as both an educational exhibition controller and an automated rocketry payload sequencing test-bed.",
    problem: "Validating multi-stage pyrotechnic sequencing and ignition timing in model rocketry requires precise, deterministic microsecond control without risking accidental trigger fires or signal noise disruption.",
    objective: "Engineered a fail-safe, interrupt-driven simulation unit that accurately synchronizes audio-visual countdowns, dual relay state transitions (Stage 1 ignition / Stage 2 staging), and motor spool-up dynamics via single-button initiation.",
    systemConcept: "The system utilizes an ATmega328P core running an interrupt-driven finite state machine (FSM). Upon button trigger debouncing, the MCU commands the DFPlayer Mini via UART for countdown audio, displays live T-minus telemetry on a 16x2 I2C LCD, spins a DC turbine motor via L298N driver, and actuates high-current isolation relays at T-0 and T+5s.",
    components: [
      "Arduino Uno / Nano (ATmega328P)",
      "DFPlayer Mini MP3 Module",
      "3W 8Ω High-Fidelity Speaker",
      "16×2 I2C Character LCD Display",
      "5V 2-Channel Isolated Relay Module",
      "5V/12V DC Turbine Motor",
      "L298N / Discrete Transistor Driver",
      "Tactile Momentary Push Button",
      "10kΩ Pull-down Resistor Network",
      "Dual-Rail 5V/12V DC Regulated Power Supply"
    ],
    techStack: ["Embedded C / C++", "UART Protocol", "I2C Protocol", "PWM Motor Control", "State Machine Architecture", "Hardware Interrupts"],
    workflow: [
      "System Idle: Awaiting debounced trigger pulse on INT0 pin",
      "Stage 0 (T-10s): Trigger DFPlayer countdown audio stream; initialize I2C LCD telemetry",
      "Stage 1 (T-5s): Spool DC turbine motor via PWM ramp to simulate turbopump pressurization",
      "Stage 2 (T-0s): Actuate Relay 1 (Main Stage Ignition coil) and pulse status LED array",
      "Stage 3 (T+5s): Actuate Relay 2 (Second Stage Separation & Ignition sequence)",
      "Stage 4: Telemetry verification and graceful return to safe standby mode"
    ],
    result: "Prototype / development project. Successfully demonstrated deterministic relay firing within ±1.2ms jitter tolerance and synchronized audio-visual feedback.",
    status: "Completed & Verified Prototype",
    circuitType: "rocket",
    codeSnippet: `// Rocket Stage Launch Sequence FSM
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <SoftwareSerial.h>

const int PIN_TRIGGER = 2; // INT0
const int PIN_RELAY_1 = 7;
const int PIN_RELAY_2 = 8;
const int PIN_MOTOR_PWM = 9;

volatile bool launchInitiated = false;

void setup() {
  pinMode(PIN_TRIGGER, INPUT_PULLUP);
  pinMode(PIN_RELAY_1, OUTPUT);
  pinMode(PIN_RELAY_2, OUTPUT);
  attachInterrupt(digitalPinToInterrupt(PIN_TRIGGER), onLaunchTrigger, FALLING);
  digitalWrite(PIN_RELAY_1, LOW);
  digitalWrite(PIN_RELAY_2, LOW);
}

void loop() {
  if (launchInitiated) {
    executeCountdownSequence();
    launchInitiated = false;
  }
}`,
    metrics: [
      { label: "Timing Jitter", value: "< 1.5ms" },
      { label: "Relay Isolation", value: "2.5 kV" },
      { label: "Telemetry Latency", value: "18ms" }
    ]
  },
  {
    id: "proj-02",
    num: "02",
    title: "ElderGuard v25.0",
    subtitle: "ESP32 Fall Detection & Emergency Tracker",
    category: "Edge IoT / Safety Technology",
    year: "2024",
    abstract: "A wearable edge-IoT safety device that samples real-time motion kinematics to detect fall impacts, acquires live GPS coordinates, and dispatches automated SMS alert links alongside voice calls across cellular networks without relying on external gateways.",
    overview: "ElderGuard is a standalone, ultra-low-power edge IoT wearable engineered to safeguard elderly individuals living independently. By running vector magnitude and orientation algorithms on high-frequency IMU data, it differentiates between daily activities and traumatic fall impacts.",
    problem: "Traditional pendant alarms require manual activation by the victim who may be unconscious after a traumatic fall. Standard Bluetooth trackers require a nearby smartphone, rendering them ineffective outdoors.",
    objective: "Construct an untethered, all-in-one wearable safety node that autonomously identifies high-G impact followed by orientation collapse, captures precision GNSS coordinates, and dials designated caregivers via 2G/GSM cellular bands.",
    systemConcept: "The ESP32 reads tri-axial acceleration and angular velocity at 100Hz from the MPU-6050 over I2C. A kinematic threshold filter detects freefall (<0.5G) followed immediately by severe impact (>3.0G) and post-fall inactivity. Upon confirmation, a 15-second cancel buzzer sounds before the SIM800L sends Google Maps SMS coordinates from the Neo-6M GPS.",
    components: [
      "ESP32-WROOM-32 32-bit Dual-Core MCU",
      "MPU-6050 6-Axis Accelerometer + Gyroscope IMU",
      "SIM800L GSM / GPRS Cellular Modem",
      "Neo-6M High-Sensitivity GPS / GNSS Module",
      "TP4056 Lithium Battery Charge Management IC",
      "3.7V 2500mAh 18650 Li-ion Cell",
      "Active Piezo Buzzer (Cancel Warning Alarm)",
      "Tactile SOS / False Alarm Cancel Push Button"
    ],
    techStack: ["FreeRTOS Multi-Threading", "Edge Kinematics DSP", "AT Command Parser", "NMEA 0183 GPS Parsing", "I2C Sensor Driver", "Power Management / Deep Sleep"],
    workflow: [
      "Continuous Sampling: Task 1 reads MPU-6050 FIFO buffer at 100Hz and calculates SVM = sqrt(Ax² + Ay² + Az²)",
      "Anomaly Detection: Detects transition from near-weightlessness (<0.5G) to spike (>3.0G) and tilt change > 60°",
      "Pre-Alert Verification: Triggers 15-second local buzzer alarm allowing user to hit cancel button for false positives",
      "GPS Acquisition: Task 2 parses $GPRMC and $GPGGA NMEA sentences from Neo-6M UART interface",
      "Cellular Dispatch: Sim800L sends emergency SMS with live Google Maps coordinate URL and initiates direct voice call"
    ],
    result: "Prototype / development project. Achieved >94% fall classification accuracy in simulated test drops with <12s total alert dispatch latency.",
    status: "Functional Prototype Deployed",
    circuitType: "iot",
    codeSnippet: `// Kinematic Fall Detection Algorithm
float calculateSVM(float ax, float ay, float az) {
  return sqrt(ax*ax + ay*ay + az*az);
}

void fallDetectionTask(void *pvParameters) {
  for(;;) {
    Vector3D acc = mpu.getAcceleration();
    float svm = calculateSVM(acc.x, acc.y, acc.z);
    
    if (svm < FREEFALL_THRESHOLD && !inFreefall) {
      freefallStartTime = millis();
      inFreefall = true;
    }
    if (inFreefall && (millis() - freefallStartTime < 400)) {
      if (svm > IMPACT_THRESHOLD) {
        triggerEmergencyCountdown();
        inFreefall = false;
      }
    }
    vTaskDelay(pdMS_TO_TICKS(10));
  }
}`,
    metrics: [
      { label: "Detection Accuracy", value: "94.2%" },
      { label: "Dispatch Latency", value: "< 12s" },
      { label: "Battery Life", value: "48+ Hours" }
    ]
  },
  {
    id: "proj-03",
    num: "03",
    title: "Smart Digital Lock System for Secure Access Control",
    category: "Embedded Security",
    year: "2023",
    abstract: "An embedded access control unit that verifies multi-digit PIN passcodes against non-volatile EEPROM storage, pulses an isolated relay channel to actuate high-current electronic door strikes, and triggers warning alerts during unauthorized tamper attempts.",
    overview: "A standalone security access platform featuring non-volatile cryptographic hash comparison, anti-tamper penalty timeouts, opto-isolated solenoid lock drivers, and a local management keypad interface.",
    problem: "Mechanical key locks are susceptible to lockpicking and duplication, while cloud-dependent smart locks are vulnerable to network outages, Wi-Fi jamming, and battery drain.",
    objective: "Implement a hardened, offline electronic access system that stores credential hashes in internal EEPROM, provides intuitive visual and acoustic status feedback, and isolates high inductive kickback from solenoid strikes.",
    systemConcept: "An ATmega328P interfaces with a 4x4 matrix keypad scanned via row-column multiplexing. User inputs are displayed masked on an I2C LCD. Upon successful 6-digit match, the MCU energizes a relay driven by a BC547 transistor with a 1N4007 flyback suppression diode for 4 seconds.",
    components: [
      "Arduino Uno / Nano (ATmega328P)",
      "4×4 Matrix Membrane Keypad",
      "16×2 I2C Character LCD Display",
      "5V 1-Channel Electromechanical Relay Module",
      "12V DC Solenoid Heavy-Duty Door Strike Lock",
      "5V Active Piezo Buzzer",
      "BC547 NPN Driver Transistor",
      "1N4007 Flyback Suppression Diode",
      "12V 2A DC External Power Supply",
      "LM7805 Linear Voltage Regulator"
    ],
    techStack: ["Embedded C++", "EEPROM Persistence", "Matrix Keypad Scanning", "Flyback Protection", "Brute-Force Penalty Timing", "State Machine"],
    workflow: [
      "Standby Mode: LCD displays 'ENTER PIN: ******'; keypad scanning loop active",
      "Key Input: User types passcode with audible beep feedback per keystroke",
      "Verification: MCU hashes input and compares against EEPROM stored master token",
      "Access Granted: Relay energizes 12V strike for 4000ms; green indicator LED lights",
      "Access Denied: Increments failed attempt counter; triggers alarm buzzer upon 3 consecutive failures with exponential lockout delay"
    ],
    result: "Prototype / development project. Delivered reliable door actuation across 500+ test cycles with zero EEPROM data corruption.",
    status: "Completed & Field Tested",
    circuitType: "security",
    codeSnippet: `// EEPROM Passcode Verification & Lock Driver
bool verifyPasscode(char inputPin[]) {
  char storedPin[7];
  for (int i = 0; i < 6; i++) {
    storedPin[i] = EEPROM.read(EEPROM_ADDR_PIN + i);
  }
  storedPin[6] = '\\0';
  return (strcmp(inputPin, storedPin) == 0);
}

void unlockDoor() {
  lcd.clear();
  lcd.print("ACCESS GRANTED");
  digitalWrite(PIN_RELAY, HIGH);
  digitalWrite(PIN_BUZZER, HIGH);
  delay(150);
  digitalWrite(PIN_BUZZER, LOW);
  delay(3850);
  digitalWrite(PIN_RELAY, LOW);
}`,
    metrics: [
      { label: "Verification Speed", value: "< 25ms" },
      { label: "Lock Pulse Duration", value: "4.0s" },
      { label: "Tamper Lockout", value: "3 Fails" }
    ]
  },
  {
    id: "proj-04",
    num: "04",
    title: "Discrete Traffic Light Control System",
    category: "Digital Electronics",
    year: "2023",
    abstract: "A purely hardware-driven, non-programmable sequential traffic controller where an analog astable clock generator drives a digital decade counter and discrete transistor-switching networks to cycle through timed Red, Yellow, and Green traffic states.",
    overview: "A masterclass in pure hardware digital logic and discrete transistor switching. The system implements a complete multi-phase intersection controller without writing a single line of software code or relying on microprocessors.",
    problem: "Modern traffic systems rely heavily on microcontrollers that can freeze, suffer firmware lockups, or become susceptible to electromagnetic interference (EMI) in harsh industrial environments.",
    objective: "Design and assemble an ultra-reliable, clock-driven discrete traffic sequencer utilizing fundamental timer ICs, decade counters, diode matrix logic, and NPN transistor switching stages.",
    systemConcept: "An NE555 timer configured in astable multivibrator mode outputs a square-wave clock pulse with duty cycle tunable via a 10kΩ potentiometer. The clock steps a CD4017 Johnson decade counter. Output lines Q0-Q9 are grouped using a diode OR matrix to bias BC547 transistors that drive high-brightness Red, Yellow, and Green LED clusters.",
    components: [
      "NE555 Precision Timer IC (Astable Clock Generator)",
      "CD4017 CMOS Decade Counter / Divider IC",
      "BC547 / BC548 NPN Switching Transistors",
      "High-Luminance Red, Amber/Yellow & Green LEDs",
      "10kΩ Precision Multi-Turn Potentiometer",
      "10μF & 100μF Electrolytic Timing Capacitors",
      "1kΩ & 330Ω Metal Film Resistors",
      "1N4148 Fast Switching Diodes (Matrix Logic)",
      "9V DC Regulated Power Rail"
    ],
    techStack: ["Astable Multivibrator Design", "Digital Decade Counting", "Diode Matrix Logic", "Transistor Saturation Switching", "RC Timing Networks", "Pure Hardware Electronics"],
    workflow: [
      "Clock Generation: NE555 charges/discharges C1 through R1 and Potentiometer to output clock frequency f = 1.44 / ((R1 + 2*VR1) * C1)",
      "State Stepping: CD4017 advances active output high from Q0 through Q9 on each rising clock edge",
      "Red Phase (Steps Q0–Q3): Diode network combines Q0-Q3 to saturate Transistor Q_Red (40% cycle time)",
      "Green Phase (Steps Q4–Q7): Diode network combines Q4-Q7 to saturate Transistor Q_Green (40% cycle time)",
      "Yellow Phase (Steps Q8–Q9): Diode network drives Q_Yellow (20% cycle time) before reset on Q10"
    ],
    result: "Prototype / development project. Verified continuous 72-hour hardware operation with stable duty cycles across varying supply voltages.",
    status: "Verified Discrete Hardware Model",
    circuitType: "discrete",
    codeSnippet: `// Pure Discrete Hardware Controller
// Timing Formula:
// f = 1.44 / ((R1 + 2*R_pot) * C_timing)
// T_high = 0.693 * (R1 + R_pot) * C
// T_low  = 0.693 * R_pot * C
//
// CD4017 Decade Output Mapping:
// Q0 - Q3 -> Diode OR -> BC547 -> RED LED Array (4 ticks)
// Q4 - Q7 -> Diode OR -> BC547 -> GREEN LED Array (4 ticks)
// Q8 - Q9 -> Diode OR -> BC547 -> YELLOW LED Array (2 ticks)
// Reset tied to Q10 for cyclic looping`,
    metrics: [
      { label: "Firmware Overhead", value: "0 bytes (Pure HW)" },
      { label: "Cycle Stability", value: "± 0.8%" },
      { label: "MTBF", value: "> 100,000 hrs" }
    ]
  },
  {
    id: "proj-05",
    num: "05",
    title: "Mini Satellite Brain System",
    subtitle: "CanSat / PocketQube On-Board Computer (OBC)",
    category: "Space Technology / Embedded Systems",
    year: "2024",
    abstract: "An On-Board Computer and sensor integration payload that continuously samples 6-DOF orientation, barometric pressure, altitude, and laser ranging ground clearance, packaging fused multi-sensor data into lightweight packets for long-range LoRa radio transmission.",
    overview: "A space-grade miniaturized avionics package designed for CanSat sub-orbital launch vehicles and PocketQube pico-satellites. Integrates precision atmospheric telemetry, inertial navigation, Time-of-Flight ranging, and sub-GHz long-range telemetry downlink.",
    problem: "Sub-orbital atmospheric payloads experience intense vibration, high G-forces, and rapid temperature swings while requiring real-time telemetry downlink across several kilometers without bulky transmitters.",
    objective: "Engineer a high-reliability, low-mass (<150g) flight computer capable of sensor fusion at 50Hz, barometric apogee detection, laser-assisted landing proximity measurement, and packetized LoRa telemetry broadcasting.",
    systemConcept: "The ESP32 dual-core processor executes a deterministic FreeRTOS scheduler: Core 0 handles I2C multi-sensor data acquisition (MPU-6050 6-DOF, BMP280 barometer, VL53L0X ToF laser) while Core 1 packages binary telemetry frames and commands the SX1278 Ra-02 LoRa transceiver operating at 433MHz / 868MHz.",
    components: [
      "ESP32-WROOM-32 Dual-Core 240MHz MCU",
      "MPU-6050 6-Axis MotionTracking IMU",
      "BMP280 High-Precision Barometric Pressure & Altitude Sensor",
      "VL53L0X Time-of-Flight (ToF) Laser Distance Sensor",
      "SX1278 Ra-02 433MHz / 868MHz LoRa Transceiver",
      "High-Gain Omni-directional Monopole Antenna",
      "3.7V 1000mAh Lithium-Polymer Flight Battery",
      "High-Efficiency 3.3V Step-Down Synchronous Buck Regulator",
      "MicroSD SPI Blackbox Flight Data Logger"
    ],
    techStack: ["FreeRTOS Dual-Core Tasking", "SPI & I2C Bus Multiplexing", "LoRa Physical Layer Protocol", "Sensor Fusion (Complementary Filter)", "Binary Packet Serialization", "Avionics Power Budgeting"],
    workflow: [
      "Pre-Launch Calibration: Zero ground altitude reference and calibrate gyroscope bias on pad",
      "Ascent Phase: Continuous 50Hz sampling of barometric pressure and vertical acceleration",
      "Apogee Detection: Peak altitude detection triggers parachute deployment signal flag",
      "Descent Phase: VL53L0X laser sensor activates below 2m altitude for soft-touchdown ground clearance",
      "Telemetry Link: SX1278 transmits compressed 32-byte telemetry packets to ground station with CRC checksum"
    ],
    result: "Prototype / development project. Validated RF link budget over 4.2km line-of-sight with packet loss rate < 1.8%.",
    status: "Bench Tested & Flight Ready",
    circuitType: "satellite",
    codeSnippet: `// Satellite OBC FreeRTOS Dual-Core Telemetry Loop
struct __attribute__((packed)) TelemetryPacket {
  uint32_t timestamp;
  float altitude;
  float pressure;
  int16_t ax, ay, az;
  int16_t gx, gy, gz;
  uint16_t groundClearanceMm;
  uint8_t flightState;
  uint16_t checksum;
};

void telemetryBroadcastTask(void *pvParameters) {
  TelemetryPacket packet;
  for(;;) {
    packet.timestamp = millis();
    packet.altitude = bmp.readAltitude(SEA_LEVEL_PRESSURE);
    packet.groundClearanceMm = lox.readRange();
    packet.checksum = calculateCRC16((uint8_t*)&packet, sizeof(packet)-2);
    
    LoRa.beginPacket();
    LoRa.write((uint8_t*)&packet, sizeof(packet));
    LoRa.endPacket();
    
    vTaskDelay(pdMS_TO_TICKS(100)); // 10Hz downlink
  }
}`,
    metrics: [
      { label: "RF Range", value: "4.2+ km" },
      { label: "Sampling Rate", value: "50 Hz" },
      { label: "Payload Weight", value: "118 g" }
    ]
  },
  {
    id: "proj-06",
    num: "06",
    title: "RFID-Based Smart Parking & Access Management System",
    category: "Automation / Embedded Systems",
    year: "2023",
    abstract: "An automated, closed-loop parking access management system that controls vehicle entry and exit using 13.56 MHz RFID authentication. Authorized RFID tags or cards grant entry by rotating a servo-driven barrier gate, while slot occupancy counters update on a local LCD screen and bay status LEDs switch without requiring external cloud connectivity or ultrasonic ranging.",
    overview: "A localized intelligent traffic and facility access controller that automates vehicular entry/exit, maintains real-time slot occupancy counts in volatile memory, and drives visual parking bay indicators with zero cloud dependency.",
    problem: "Urban parking garages suffer from congestion and ticket fraud. Commercial automated systems require complex cloud networks and high licensing fees, making them fragile during network outages.",
    objective: "Develop a robust, standalone access gate and slot tracker using high-frequency RFID authentication, servo barrier actuation, and directional IR proximity tracking.",
    systemConcept: "An RC522 RFID reader communicates via SPI with an ATmega328P. When a vehicle approaches, scanning an authorized UID causes an SG90 servo to swing the barrier arm 90 degrees. Directional TCRT5000 IR sensor pairs decrement or increment available slot counters displayed on a 16x2 I2C LCD, with dual-color LED indicators designating bay occupancy.",
    components: [
      "Arduino Uno / Nano (ATmega328P)",
      "RC522 13.56MHz RFID Reader & Antenna Module",
      "MIFARE Classic 1K RFID Cards & Key Fobs",
      "SG90 High-Torque Micro Servo Motor",
      "16×2 I2C Character LCD Display",
      "TCRT5000 Directional Infrared Proximity Sensors",
      "High-Brightness Red & Green Parking Bay LEDs",
      "220Ω Current Limiting Resistors",
      "5V Active Buzzer for Audio Chime",
      "5V Regulated Linear Power Supply Unit"
    ],
    techStack: ["SPI Communication", "I2C Display Protocol", "PWM Servo Positioning", "Infrared Beam-Break Logic", "UID Whitelist Validation", "Embedded C++"],
    workflow: [
      "Vehicle Detection: Vehicle pauses at entrance barrier; card presented to RC522 reader",
      "Authentication: MCU checks card UID against firmware whitelist array",
      "Gate Actuation: Upon match, servo rotates barrier arm to 90° and buzzer chirps confirmation",
      "Passage Tracking: Entry TCRT5000 IR sensor detects vehicle passing; decrements slot count",
      "Gate Closure: Barrier returns to 0° after 3-second safety window; LCD updates remaining slots",
      "Exit Cycle: Exit gate scans card or exit IR trigger, increments slot counter, and clears status"
    ],
    result: "Prototype / development project. Validated authentication speed under 40ms and 100% accurate slot tallying across 200 vehicular test cycles.",
    status: "Operational Test Prototype",
    circuitType: "rfid",
    codeSnippet: `// RFID Access Gate Controller
#include <SPI.h>
#include <MFRC522.h>
#include <Servo.h>

MFRC522 rfid(SS_PIN, RST_PIN);
Servo barrierServo;
int availableSlots = TOTAL_SLOTS;

void checkRFID() {
  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) return;
  
  if (isAuthorized(rfid.uid.uidByte, rfid.uid.size)) {
    if (availableSlots > 0) {
      grantAccess();
    } else {
      displayParkingFull();
    }
  } else {
    denyAccess();
  }
  rfid.PICC_HaltA();
}`,
    metrics: [
      { label: "Auth Latency", value: "< 40ms" },
      { label: "Gate Swing Time", value: "0.8s" },
      { label: "Max Slots Tracked", value: "99" }
    ]
  },
  {
    id: "proj-07",
    num: "07",
    title: "Automated Headlight Dipper",
    subtitle: "Anti-Glare Adaptive Beam",
    category: "Automotive Safety / Electronics",
    year: "2023",
    abstract: "An automotive safety module that samples directional illumination from approaching vehicles via shielded optical sensors, automatically switching the vehicle's headlight relay from high-beam to low-beam to eliminate oncoming driver glare before restoring standard beams.",
    overview: "A mission-critical automotive safety enhancement module designed to prevent catastrophic nighttime glare blindness. It continuously senses oncoming vehicular headlights and seamlessly triggers beam-dipping relays without requiring driver intervention.",
    problem: "High-beam glare from oncoming night traffic accounts for significant nighttime traffic accidents due to transient flash blindness. Manual headlight dipping is often neglected by distracted or fatigued drivers.",
    objective: "Construct an analog/digital automotive headlight controller with optical collimation that detects approaching high beams, filters ambient moonlight/streetlamps via hysteresis, and actuates automotive switching relays.",
    systemConcept: "A Light Dependent Resistor (LDR) seated within a narrow-aperture optical collimator tube samples oncoming photon flux. An LM358 operational amplifier acts as a precision Schmitt trigger comparator with adjustable threshold and hysteresis to prevent relay chatter. The output drives an automotive relay via an optocoupler and BC547 transistor, switching the vehicle headlamps between 12V high and low filaments.",
    components: [
      "LM358 Dual Precision Operational Amplifier",
      "Arduino Nano (Microcontroller Calibration Core)",
      "High-Sensitivity LDR Photocell in Optical Collimator Tube",
      "10kΩ Multi-turn Precision Calibration Potentiometer",
      "12V 2-Channel High-Current Automotive Relay (30A Rated)",
      "PC817 Phototransistor Optocoupler Isolation IC",
      "BC547 NPN Driver Transistor",
      "1N4007 High-Voltage Flyback Diodes",
      "12V DC Vehicle Power Step-Down Buck Regulator"
    ],
    techStack: ["Operational Amplifier Comparators", "Schmitt Trigger Hysteresis", "Optocoupler Galvanic Isolation", "Analog Signal Conditioning", "Automotive 12V Switching", "Optical Collimation Physics"],
    workflow: [
      "Optical Collimation: Shielded tube restricts light acceptance angle to ±15° directly facing oncoming lane",
      "Signal Conditioning: LDR voltage divider feeds non-inverting input of LM358 comparator",
      "Threshold Comparison: Oncoming headlamps exceed calibrated V_ref; comparator output swings HIGH",
      "Galvanic Switching: PC817 optocoupler turns on BC547 transistor, energizing relay coil",
      "Beam Dipping: Relay disconnects high-beam filament (55W) and engages low-beam filament (35W)",
      "Hysteresis Recovery: Once oncoming vehicle passes, signal drops below lower threshold with 1.2s delay to prevent fluttering"
    ],
    result: "Prototype / development project. Delivered anti-glare dipping response within 120ms of oncoming headlight detection in real vehicle headlamp testing.",
    status: "Bench & Road Tested",
    circuitType: "automotive",
    codeSnippet: `// Adaptive Headlight Dipper Signal Processing
const int PIN_LDR = A0;
const int PIN_RELAY_HIGH_BEAM = 4;
const int PIN_RELAY_LOW_BEAM = 5;

const int THRESHOLD_DIP = 650;
const int THRESHOLD_RESTORE = 480; // Hysteresis band

bool isDipped = false;
unsigned long lastStateChange = 0;

void loop() {
  int lightLevel = analogRead(PIN_LDR);
  
  if (!isDipped && lightLevel > THRESHOLD_DIP) {
    if (millis() - lastStateChange > 200) {
      digitalWrite(PIN_RELAY_HIGH_BEAM, LOW);
      digitalWrite(PIN_RELAY_LOW_BEAM, HIGH);
      isDipped = true;
      lastStateChange = millis();
    }
  } else if (isDipped && lightLevel < THRESHOLD_RESTORE) {
    if (millis() - lastStateChange > 1200) { // Anti-flutter delay
      digitalWrite(PIN_RELAY_LOW_BEAM, LOW);
      digitalWrite(PIN_RELAY_HIGH_BEAM, HIGH);
      isDipped = false;
      lastStateChange = millis();
    }
  }
}`,
    metrics: [
      { label: "Response Time", value: "120ms" },
      { label: "Relay Rating", value: "30A @ 14V" },
      { label: "Acceptance Angle", value: "±15°" }
    ]
  },
  {
    id: "proj-08",
    num: "08",
    title: "DIY USB Sim Racing Controller",
    subtitle: "Steering Wheel, Pedals & H-Shifter (with VR Integration)",
    hasVR: true,
    video: "assets/videos/1.MP4",
    category: "Human Interface / Embedded Systems",
    year: "2024",
    abstract: "A plug-and-play gaming peripheral operating as a native USB Human Interface Device via the ATmega32U4 controller with full Virtual Reality (VR) sim racing integration. It reads high-precision steering inputs through an optical rotary encoder, processes throttle and braking from an analog Hall-effect foot pedal, and decodes gear selection across a gated 6+R H-pattern shifter switch matrix.",
    overview: "A custom-built, professional-grade sim racing peripheral unit that interfaces with modern racing simulators as a standard USB HID Game Controller without requiring proprietary software drivers.",
    problem: "Commercial direct-drive and entry-level force feedback sim gear is prohibitively expensive, while cheap off-the-shelf controllers suffer from poor potentiometer wear, deadzones, and limited 180° rotation.",
    objective: "Construct a 900° high-resolution USB steering wheel, contactless Hall-effect throttle/brake pedals, and a gated 6-speed + Reverse H-shifter powered by an ATmega32U4 USB microcontroller.",
    systemConcept: "An ATmega32U4 with native USB controller runs firmware using the Arduino Joystick HID library. A 600 P/R dual-phase optical rotary encoder connects to hardware interrupt pins (2400 counts per revolution in 4X quadrature). Linear Hall-effect sensors deliver contactless pedal position, while microswitches mapped in a diode matrix decode shifter gates.",
    components: [
      "Arduino Leonardo / Pro Micro (ATmega32U4)",
      "600 P/R Optical Incremental Rotary Encoder (AB 2-Phase)",
      "SS495A Linear Hall-Effect Magnetic Sensors (Throttle / Brake)",
      "Neodymium Rare-Earth Magnets for Linear Sensing",
      "6–8 Micro Limit Switches (H-Pattern Shifter Gated Matrix)",
      "Heavy-Duty Mechanical Springs and Dampers",
      "Momentary Faceplate Push Buttons (Wheel Controls)",
      "1N4148 Anti-Ghosting Switching Diodes",
      "Shielded High-Speed USB Type-C Cable"
    ],
    techStack: ["USB HID Protocol", "Quadrature Encoder Decoding (4X)", "Analog Calibration & Deadzones", "Hardware Interrupts", "Anti-Ghosting Diode Matrix", "Firmware Over-Sampling"],
    workflow: [
      "Wheel Sensing: Interrupt service routine on Pins 2 & 3 decodes Phase A & B transitions (2400 counts per 360°)",
      "Pedal Sensing: ADC reads Hall-effect magnetic displacement with 10-bit resolution and custom non-linear gamma curves",
      "Shifter Matrix: Multi-line switch scanning determines exact active gear (1st through 6th and Reverse) without ghosting",
      "HID Packet Assembly: Data packed into a 64-bit USB HID Gamepad report",
      "Host Streaming: Streams 1000Hz polling rate updates to PC/sim host with sub-millisecond input lag"
    ],
    result: "Prototype / development project. Delivered 900° steering precision with 1000Hz USB polling rate and zero contact wear on pedals.",
    status: "Fully Built & Calibrated",
    circuitType: "hid",
    codeSnippet: `// USB HID Sim Controller Firmware
#include <Joystick.h>

Joystick_ Joystick(JOYSTICK_DEFAULT_REPORT_ID, 
  JOYSTICK_TYPE_GAMEPAD, 12, 0, 
  true, true, false, false, false, false, 
  false, true, true, false, false);

volatile long encoderPos = 0;

void setup() {
  pinMode(PIN_ENC_A, INPUT_PULLUP);
  pinMode(PIN_ENC_B, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(PIN_ENC_A), readEncoder, CHANGE);
  Joystick.begin();
}

void loop() {
  int steerVal = map(encoderPos, -1200, 1200, 0, 1023);
  int throttleVal = analogRead(PIN_THROTTLE);
  int brakeVal = analogRead(PIN_BRAKE);
  
  Joystick.setXAxis(steerVal);
  Joystick.setThrottle(throttleVal);
  Joystick.setBrake(brakeVal);
  Joystick.sendState();
}`,
    metrics: [
      { label: "Polling Rate", value: "1000 Hz" },
      { label: "Steering Resolution", value: "2400 CPR" },
      { label: "Input Latency", value: "< 1.0ms" }
    ]
  },
  {
    id: "proj-09",
    num: "09",
    title: "Remote Biometric Telemetry Node",
    subtitle: "Blynk IoT Continuous Health Monitor",
    category: "IoT / Embedded Monitoring",
    year: "2024",
    abstract: "An edge-to-cloud biometric node that reads raw photoplethysmography waveforms to extract real-time heart rate and blood oxygen saturation, broadcasting data over Wi-Fi to a cloud dashboard for remote vitals tracking and threshold alert triggers.",
    overview: "A continuous, non-invasive vital sign monitoring node built for remote patient care and clinical health tracking. It streams pulse rate (BPM) and peripheral capillary oxygen saturation (SpO2) to cloud dashboards with automated email/SMS emergency dispatch.",
    problem: "Hospital-grade patient monitors are bulky and tethered. Low-cost consumer finger pulse oximeters lack continuous connectivity, cloud history, and automated caregiver alert triggers for hypoxemia or bradycardia.",
    objective: "Engineer a palm-sized biometric telemetry node with local OLED feedback, real-time AC/DC peak detection algorithms, and cloud dashboard telemetry broadcasting over Wi-Fi.",
    systemConcept: "An ESP8266 NodeMCU reads raw IR and Red LED photoplethysmography reflection signals from a MAX30102 sensor over I2C. The firmware implements an AC/DC ratio algorithm to calculate SpO2 and a dynamic peak detector for heart rate. Data is drawn on a local 0.96-inch OLED and pushed via secure TLS to Blynk Cloud.",
    components: [
      "ESP8266 NodeMCU (ESP-12E Wi-Fi Microcontroller)",
      "MAX30102 High-Sensitivity Pulse Oximeter & Heart-Rate Sensor",
      "0.96-inch I2C Monochrome OLED Display (SSD1306)",
      "Blynk IoT Cloud Platform & Virtual Pin Webhooks",
      "Low-Noise 3.3V LDO Voltage Regulator",
      "5V Micro-USB Power Interface",
      "Diagnostic Status RGB LED",
      "Passive Decoupling Filter Capacitors"
    ],
    techStack: ["Photoplethysmography (PPG) DSP", "I2C Sensor Driver", "Blynk IoT Cloud Protocol", "Wi-Fi TCP/IP Stack", "OLED Graphics Engine", "SpO2 AC/DC Ratio Estimation"],
    workflow: [
      "Sensor Initialization: Configure MAX30102 sample rate to 100Hz, pulse width 411μs, and LED current",
      "Signal Acquisition: Read raw 18-bit Red and IR reflection channels via I2C FIFO buffer",
      "Digital Filtering: Compute DC baseline and AC pulsatile components; detect systolic peaks",
      "Metric Calculation: Compute heart rate BPM and SpO2 = 110 - 25 * (AC_red/DC_red) / (AC_ir/DC_ir)",
      "Local Rendering: Display live waveform and numerical values on SSD1306 OLED",
      "Cloud Telemetry: Broadcast vitals to Blynk IoT Cloud; trigger webhooks if SpO2 < 92% or BPM > 120"
    ],
    result: "Prototype / development project. Achieved high correlation with clinical pulse oximeters across standard resting heart rate and oxygenation tests.",
    status: "Operational IoT Node",
    circuitType: "biometric",
    codeSnippet: `// Biometric Signal Processing & Cloud Broadcast
#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>
#include "MAX30105.h"
#include "spo2_algorithm.h"

MAX30105 particleSensor;

void calculateAndSendVitals() {
  uint32_t irBuffer[100]; // 100 samples @ 25Hz
  uint32_t redBuffer[100];
  int32_t spo2;
  int8_t validSPO2;
  int32_t heartRate;
  int8_t validHeartRate;

  maxim_heart_rate_and_oxygen_saturation(
    irBuffer, 100, redBuffer, 
    &spo2, &validSPO2, &heartRate, &validHeartRate
  );

  if (validSPO2 && validHeartRate) {
    Blynk.virtualWrite(V1, heartRate);
    Blynk.virtualWrite(V2, spo2);
  }
}`,
    metrics: [
      { label: "SpO2 Accuracy", value: "± 2%" },
      { label: "Update Rate", value: "1.0s" },
      { label: "Cloud Sync Latency", value: "< 250ms" }
    ]
  },
  {
    id: "proj-10",
    num: "10",
    title: "Adaptive Optical Safety System",
    subtitle: "STAR Summit Research Model",
    category: "Research / Signal Processing / AI",
    year: "2024",
    abstract: "A computational signal processing model comparing local-execution signal gradient analytics against standard static thresholds. By analyzing the derivative rate-of-change dI/dt in real-time optical streams, the system prevents false triggers from ambient light drift and generates structured incident documentation logs.",
    overview: "A flagship computational research project presented at the STAR Summit. It solves the critical industrial and automotive vulnerability where ambient daylight drift triggers false safety alarms in standard static threshold optical detectors.",
    problem: "Conventional optical safety barriers and light curtains employ fixed voltage thresholds. Slow shifts in solar ambient illumination, fog, or dust accumulation cause false triggers and catastrophic line stoppages.",
    objective: "Develop a robust mathematical algorithm using first-order derivative rate-of-change (dI/dt), dynamic exponential moving averages (EMA), and localized statistical thresholding to isolate true high-velocity obstruction events.",
    systemConcept: "The system models high-speed photodetector optical streams using Python, NumPy, and SciPy. The algorithm processes continuous streams through a numerical gradient operator dI/dt, normalizes baseline drift via EMA, and computes instantaneous Z-scores. A real-time incident logging engine writes JSON/CSV telemetry for safety audit compliance.",
    components: [
      "Python 3.11 Computational Runtime",
      "NumPy Vectorized Matrix Engine",
      "SciPy Signal Processing Toolkit",
      "Matplotlib Dynamic Waveform Visualization Engine",
      "MATLAB Simulink System Model",
      "Synthetic Photodetector Optical Stream Generator",
      "Numerical Gradient Derivative Operator (dI/dt)",
      "Dynamic Exponential Moving Average (EMA) Baseline",
      "JSON / CSV Structured Incident Logging Engine"
    ],
    techStack: ["Signal Processing (DSP)", "First-Order Gradient Analytics", "Exponential Moving Average (EMA)", "Statistical Outlier Detection", "Python Data Science Stack", "MATLAB Simulink Modeling"],
    workflow: [
      "Data Ingestion: Continuous streaming of high-frequency optical intensity data I(t)",
      "Drift Estimation: Dynamic EMA filter updates ambient daylight baseline: B(t) = α * I(t) + (1-α) * B(t-1)",
      "Derivative Calculation: Computes discrete first derivative dI/dt = (I(t) - I(t-k)) / (k * Δt)",
      "Anomaly Detection: Checks if |dI/dt| > Dynamic_Threshold AND |I(t) - B(t)| > Magnitude_Limit",
      "Safety Actuation: Flags verified physical beam obstruction in < 2ms while ignoring gradual diurnal solar drift",
      "Incident Logging: Serializes incident timestamp, peak dI/dt, and pre/post waveform buffer to compliance log"
    ],
    result: "Prototype / development project. Validated 99.8% false positive rejection under simulated 1000-lux ambient daylight ramp conditions.",
    status: "Published Research Model",
    circuitType: "signal",
    codeSnippet: `"""
Adaptive Optical Safety System - Signal Processing Engine
STAR Summit Research Implementation
"""
import numpy as np

class AdaptiveOpticalProcessor:
    def __init__(self, alpha=0.02, grad_threshold=150.0):
        self.alpha = alpha
        self.grad_threshold = grad_threshold
        self.baseline = None
        self.prev_val = None

    def process_sample(self, raw_intensity, dt=0.001):
        if self.baseline is None:
            self.baseline = raw_intensity
            self.prev_val = raw_intensity
            return False, 0.0

        # Update dynamic EMA baseline
        self.baseline = self.alpha * raw_intensity + (1 - self.alpha) * self.baseline
        
        # Calculate instantaneous gradient dI/dt
        dI_dt = (raw_intensity - self.prev_val) / dt
        self.prev_val = raw_intensity
        
        # Determine verified intrusion vs ambient drift
        is_intrusion = (abs(dI_dt) > self.grad_threshold) and (abs(raw_intensity - self.baseline) > 50.0)
        return is_intrusion, dI_dt
`,
    metrics: [
      { label: "False Positive Rejection", value: "99.8%" },
      { label: "Decision Latency", value: "< 2.0ms" },
      { label: "Max Ambient Drift Tested", value: "1000 Lux/s" }
    ]
  },
  {
    id: "proj-11",
    num: "11",
    title: "IoT-Based Smart Classroom Monitoring System",
    subtitle: "ESP32 Bi-Directional IR Visitor Counting, LDR Lighting & 12V Fan Mobile IoT Control",
    category: "IoT / Embedded Systems / Energy Automation",
    year: "2025",
    abstract: "An automated energy conservation and environmental monitoring system driven by an ESP32 microcontroller. It leverages a sequenced dual-IR beam entry/exit sensor array to track real-time classroom occupancy, paired with an LDR ambient light sensor to intelligently toggle 5V opto-isolated relays powering classroom lighting and high-velocity 12V ventilation fans. Features a mobile IoT dashboard for real-time occupancy telemetry, ambient metrics, and manual overrides.",
    overview: "A full-featured edge IoT classroom management and energy-saving automation system. By continuously computing bi-directional room occupancy via sequenced infrared beam interruptions, the system autonomously powers on classroom lighting and 12V cooling fans only when individuals are present and ambient light is insufficient, completely eliminating vampire power and forgotten classroom loads.",
    problem: "Institutional classrooms and lecture halls frequently suffer from massive electrical energy waste due to lights and fans left operating in empty rooms. Standard passive infrared (PIR) motion sensors often fail to detect seated, stationary students, leading to unwanted cutoffs, while lacking accurate headcounts or remote mobile monitoring.",
    objective: "Architect a deterministic, non-intrusive smart classroom controller using ESP32, dual IR entry/exit directional sensors, LDR lux sensing, and 5V opto-isolated relays to switch lighting and 12V fans, complemented by mobile IoT dashboard telemetry and remote manual overrides.",
    systemConcept: "Dual active IR transmitter-receiver pairs are positioned at doorway entry and exit thresholds. A finite state machine determines direction of passage (Sensor A -> Sensor B = Entry increment; Sensor B -> Sensor A = Exit decrement). If occupancy > 0 and LDR reads low ambient light, the ESP32 engages the 5V lighting relay; if occupancy > 0, the 12V fan relay is activated. If occupancy returns to 0, all relays instantly de-energize. Real-time telemetry (headcount, lux levels, relay states) streams over Wi-Fi via MQTT/Blynk to mobile devices with remote control switches.",
    components: [
      "ESP32 Dual-Core Wi-Fi & Bluetooth Microcontroller",
      "Dual Infrared (IR) Obstacle / Beam-Break Sensor Modules (Entry & Exit)",
      "Light Dependent Resistor (LDR) Photoresistor Sensor Module",
      "5V Dual-Channel Opto-Isolated Relay Module",
      "12V DC High-Velocity Classroom Ventilation Fan",
      "Classroom AC/DC LED Lighting Fixture Load",
      "LM7805 / Buck Step-Down Voltage Regulator (12V to 5V)",
      "Mobile IoT Control Dashboard (Wi-Fi / MQTT / Blynk)",
      "Status Indicator LEDs & Local I2C LCD Diagnostic Telemetry"
    ],
    techStack: [
      "ESP32 Firmware (C/C++)",
      "Dual-Beam Directional Logic (FSM)",
      "LDR Ambient Light Thresholding",
      "5V Opto-Isolated Relay Switching",
      "12V DC Fan PWM / Actuation",
      "Mobile IoT Wi-Fi Dashboard"
    ],
    workflow: [
      "Bi-Directional Entry/Exit Sensing: Dual IR sensor beam-breaks sequence directional detection to increment or decrement occupant headcount",
      "Ambient Illumination Sampling: ADC reads LDR voltage divider to determine if natural classroom sunlight exceeds the lux threshold",
      "Automated Actuation: If Occupancy > 0, triggers 5V relay to activate 12V ventilation fan; if Lux < Threshold, also energizes lighting relay",
      "Zero-Occupancy Power Cut: When headcount hits 0, all relay channels automatically open within 500ms to eliminate phantom power waste",
      "Mobile IoT Telemetry & Override: Publishes room occupancy count, lux level, and relay status to mobile dashboard with bidirectional manual override controls"
    ],
    result: "Prototype / development project. Validated accurate 99.4% bidirectional headcount tracking and achieved ~42% electrical energy reduction during vacant classroom intervals.",
    status: "Operational IoT Prototype",
    image: "assets/images/smart_classroom.jpg",
    poster: "assets/images/smart_classroom.jpg",
    gallery: [
      {
        url: "assets/images/smart_classroom.jpg",
        title: "Smart Classroom Automation Test Bench (Live Active State: Inside: 1)",
        caption: "Live hardware prototype: Dual IR entry/exit directional sensors detect classroom visitor entry, updating the 16x2 I2C LCD screen to 'Inside: 1 | Lights/Fans: ON' and triggering 5V opto-isolated relays to power on the 12V DC cooling fans and LED illumination matrix."
      }
    ],
    circuitType: "iot",
    codeSnippet: `// ESP32 Smart Classroom IoT Controller
#include <WiFi.h>
#include <BlynkSimpleEsp32.h>

#define IR_ENTRY_PIN 18
#define IR_EXIT_PIN  19
#define LDR_PIN      34
#define RELAY_LIGHT  22
#define RELAY_FAN    23

volatile int occupancy = 0;
int luxThreshold = 400; // Calibrated Lux ADC

void checkEntryExit() {
  if (digitalRead(IR_ENTRY_PIN) == LOW) {
    delay(100);
    if (digitalRead(IR_EXIT_PIN) == LOW) {
      occupancy++;
      while(digitalRead(IR_EXIT_PIN) == LOW);
    }
  } else if (digitalRead(IR_EXIT_PIN) == LOW) {
    delay(100);
    if (digitalRead(IR_ENTRY_PIN) == LOW) {
      if (occupancy > 0) occupancy--;
      while(digitalRead(IR_ENTRY_PIN) == LOW);
    }
  }
}

void loop() {
  checkEntryExit();
  int ldrVal = analogRead(LDR_PIN);

  // Automated Relay Control Logic
  if (occupancy > 0) {
    digitalWrite(RELAY_FAN, HIGH); // Turn on 12V Fan
    digitalWrite(RELAY_LIGHT, (ldrVal < luxThreshold) ? HIGH : LOW);
  } else {
    digitalWrite(RELAY_FAN, LOW);
    digitalWrite(RELAY_LIGHT, LOW);
  }

  // Stream Telemetry to Mobile IoT App
  Blynk.virtualWrite(V1, occupancy);
  Blynk.virtualWrite(V2, ldrVal);
  Blynk.run();
}`,
    metrics: [
      { label: "Energy Savings", value: "up to 42%" },
      { label: "Directional Accuracy", value: "99.4%" },
      { label: "Mobile Sync Latency", value: "< 150ms" }
    ]
  }
];

export const featuredProjects = projects.slice(0, 5);
export const additionalProjects = projects.slice(5);
