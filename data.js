/**
 * GOKULRAJ NATARAJAN — PORTFOLIO DATA ARCHIVE
 */

window.PORTFOLIO_DATA = {
  projects: [
    {
      id: "proj-01",
      num: "01",
      title: "DIY USB Sim Racing Controller",
      subtitle: "Steering Wheel, Pedals & H-Shifter (with VR Integration)",
      hasVR: true,
      currentView: "Sim Controller Rig",
      vrCurrentView: "VR Cockpit Simulation",
      protocol: "1000Hz HID USB",
      category: "Human Interface / Embedded Systems",
      year: "2024",
      abstract: "A plug-and-play gaming peripheral operating as a native USB Human Interface Device via the ATmega32U4 controller with full Virtual Reality (VR) sim racing integration. It reads high-precision steering inputs through an optical rotary encoder, processes throttle and braking from an analog Hall-effect foot pedal, and decodes gear selection across a gated 6+R H-pattern shifter switch matrix.",
      overview: "A custom-built, professional-grade sim racing peripheral unit that interfaces with modern racing simulators and immersive Virtual Reality (VR) environments as a standard USB HID Game Controller without requiring proprietary software drivers.",
      problem: "Commercial direct-drive and entry-level force feedback sim gear is prohibitively expensive, while cheap off-the-shelf controllers suffer from poor potentiometer wear, deadzones, and limited 180° rotation.",
      objective: "Construct a 900° high-resolution USB steering wheel, contactless Hall-effect throttle/brake pedals, and a gated 6-speed + Reverse H-shifter powered by an ATmega32U4 USB microcontroller for high-immersion VR and PC sim racing.",
      systemConcept: "An ATmega32U4 with native USB controller runs firmware using the Arduino Joystick HID library. A 600 P/R dual-phase optical rotary encoder connects to hardware interrupt pins (2400 counts per revolution in 4X quadrature). Linear Hall-effect sensors deliver contactless pedal position, while microswitches mapped in an anti-ghost matrix decode shifter gates for immersive VR cockpit tracking.",
      components: [
        "Arduino Leonardo / Pro Micro (ATmega32U4)",
        "600 P/R Optical Incremental Rotary Encoder (AB 2-Phase)",
        "SS495A Linear Hall-Effect Magnetic Sensors (Throttle / Brake)",
        "Neodymium Rare-Earth Magnets for Linear Sensing",
        "6–8 Micro Limit Switches (H-Pattern Shifter Gated Matrix)",
        "Heavy-Duty Mechanical Springs and Dampers",
        "Momentary Faceplate Push Buttons (Wheel Controls)",
        "Anti-Ghost Matrix (H-Pattern Shifter)",
        "Shielded High-Speed USB Type-C Cable"
      ],
      techStack: ["USB HID Protocol", "Virtual Reality (VR) Sim Integration", "Quadrature Encoder Decoding (4X)", "Analog Calibration & Deadzones", "Hardware Interrupts", "Anti-Ghost Matrix", "Firmware Over-Sampling"],
      workflow: [
        "Wheel Sensing: Interrupt service routine on Pins 2 & 3 decodes Phase A & B transitions (2400 counts per 360°)",
        "Pedal Sensing: ADC reads Hall-effect magnetic displacement with 10-bit resolution and custom non-linear gamma curves",
        "Shifter Matrix: Multi-line switch scanning determines exact active gear (1st through 6th and Reverse) without ghosting",
        "HID Packet Assembly: Data packed into a 64-bit USB HID Gamepad report",
        "Host Streaming: Streams 1000Hz polling rate updates to PC / VR sim host with sub-millisecond input lag"
      ],
      result: "Prototype / development project. Delivered 900° steering precision with 1000Hz USB polling rate, verified VR cockpit responsiveness, and zero contact wear on pedals.",
      status: "Fully Built & Calibrated",
      video: "assets/videos/Steering (2).MP4",
      defaultVideo: "assets/videos/Steering (2).MP4",
      vrVideo: "assets/videos/1.MP4",
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
      id: "proj-02",
      num: "02",
      title: "Microcontroller-Based Rocket Stage & Launch Sequence Simulator",
      subtitle: "Automated Launch Sequence & Telemetry Test Bench",
      currentView: "Rocket Launch Simulator",
      protocol: "UART / Relay FSM",
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
      video: "assets/videos/2.MP4",
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
      id: "proj-03",
      num: "03",
      title: "IoT Based Smart Parking Management Infrastructure",
      subtitle: "Multiplexed IR Telemetry & RFID Barrier • [Awarded: Best Capstone Project]",
      currentView: "Smart Parking System",
      protocol: "SPI RFID / I2C",
      category: "IoT / Smart Infrastructure",
      year: "2025",
      abstract: "An automated, closed-loop parking management infrastructure that controls vehicle entry and exit using 13.56 MHz RFID authentication. Multiplexed IR sensor arrays detect sub-second bay occupancy, updating local LCD screens and broadcasting real-time slot telemetry to reduce urban parking search latency by 40%.",
      overview: "A localized intelligent traffic and facility access controller that automates vehicular entry/exit, maintains real-time slot occupancy counts, and drives visual parking bay indicators. Awarded Best Capstone Project for outstanding circuit layout and energy efficiency.",
      problem: "Urban parking garages suffer from congestion and ticket fraud. Commercial automated systems require complex cloud networks and high licensing fees, making them fragile during network outages.",
      objective: "Develop a robust, standalone access gate and slot tracker using high-frequency RFID authentication, servo barrier actuation, and directional IR proximity tracking.",
      systemConcept: "An RC522 RFID reader communicates via SPI with an ATmega328P. When a vehicle approaches, scanning an authorized UID causes an SG90 servo to swing the barrier arm 90 degrees. Directional IR sensor pairs decrement or increment available slot counters displayed on a 16x2 I2C LCD, with dual-color LED indicators designating bay occupancy.",
      components: [
        "Arduino Uno / Nano (ATmega328P)",
        "RC522 13.56MHz RFID Reader & Antenna Module",
        "MIFARE Classic 1K RFID Cards & Key Fobs",
        "SG90 High-Torque Micro Servo Motor",
        "16×2 I2C Character LCD Display",
        "IR Sensor Module (Vehicle Detection Array)",
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
        "Passage Tracking: Entry IR sensor detects vehicle passing; decrements slot count",
        "Gate Closure: Barrier returns to 0° after 3-second safety window; LCD updates remaining slots",
        "Exit Cycle: Exit gate scans card or exit IR trigger, increments slot counter, and clears status"
      ],
      result: "Prototype / development project. Validated authentication speed under 40ms and 100% accurate slot tallying across 200 vehicular test cycles.",
      status: "Award-Winning Capstone Prototype",
      video: "assets/videos/3.MOV",
      poster: "assets/videos/3.jpeg",
      award: {
        title: "Best Capstone Project Award (1st Place)",
        organization: "SIMATS Engineering (Saveetha Institute of Medical and Technical Sciences)",
        year: "2025",
        certificateImage: "assets/images/best_capstone_certificate.jpeg",
        citation: "Award of Excellence for Best Capstone Project 2025. Recognized for innovative multiplexed IR sensor telemetry, high-frequency RFID authentication gate control, and energy-optimized standby power management."
      },
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
      id: "proj-04",
      num: "04",
      title: "IoT Enabled Automated Precision Dosing System",
      subtitle: "ESP32 Microcontroller, PWM Switching & Liquid Telemetry",
      currentView: "Precision Dosing System",
      protocol: "PWM / Blynk IoT",
      category: "IoT / Industrial Automation",
      year: "2026",
      abstract: "An automated closed-loop fluid and chemical dosing platform driven by an ESP32 microcontroller to regulate chemical reagent injection with ±1.5% precision, featuring live Blynk Cloud stroke-rate modulation and emergency failsafe shut-off thresholds.",
      overview: "An automated closed-loop fluid dosing platform integrating an ESP32 microcontroller to regulate chemical reagent injection with ±1.5% precision. Features real-time cloud telemetry for stroke-rate modulation, tank level tracking, and automated emergency shut-off thresholds.",
      problem: "Manual fluid and chemical reagent dispensing in laboratories, water treatment plants, and hydroponics leads to operator exposure, dosage variance, and critical system overflows.",
      objective: "Engineer an automated closed-loop fluid dosing unit combining high-resolution PWM peristaltic actuation, fluid level telemetry, and remote Blynk IoT mobile management.",
      systemConcept: "An ESP32 microcontroller controls fluid dosing pumps with fine duty-cycle PWM. Flow rate sensors monitor fluid passage in real time, streaming volume data to Blynk Cloud while local safety lockouts prevent dry-running and over-dosage.",
      components: [
        "ESP32 Microcontroller",
        "12V Precision Peristaltic Dosing Pump",
        "Flow Meter / Hall Effect Volume Sensor",
        "16×2 I2C Character LCD Display",
        "Blynk IoT Cloud Dashboard",
        "12V 3A DC Regulated Power Supply"
      ],
      techStack: ["PWM Duty-Cycle Modulation", "Closed-Loop Liquid Telemetry", "Blynk IoT Cloud Protocol", "MOSFET Power Switching", "Failsafe Emergency Lockouts", "Embedded C++"],
      workflow: [
        "Standby & Priming: Check reagent reservoir levels via flow calibration",
        "Dosage Configuration: Set target volume (mL) or rate (mL/min) locally or via Blynk mobile dashboard",
        "PWM Actuation: ESP32 pulses dosing driver with calibrated duty cycle for precision flow regulation",
        "Closed-Loop Feedback: Flow sensor verifies dispensed volume against target with ±1.5% tolerance",
        "Telemetry & Failsafe: Streams live tank status to cloud; auto shuts off upon low fluid or sensor disconnect"
      ],
      result: "Prototype / development project. Delivered chemical injection with ±1.5% precision and instantaneous cloud alert dispatch on reservoir depletion.",
      status: "Completed & Field Verified",
      video: "assets/videos/4.MP4",
      circuitType: "iot",
      codeSnippet: `// IoT Precision Chemical Dosing Controller
#include <WiFi.h>
#include <BlynkSimpleEsp32.h>

const int PIN_MOSFET_PWM = 18;
const int PIN_FLOW_SENSOR = 23;

volatile int pulseCount = 0;
float targetVolumeMl = 250.0;
float currentDispensedMl = 0.0;

void IRAM_ATTR onFlowPulse() {
  pulseCount++;
}

void setup() {
  pinMode(PIN_MOSFET_PWM, OUTPUT);
  pinMode(PIN_FLOW_SENSOR, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(PIN_FLOW_SENSOR), onFlowPulse, RISING);
}

void executeDosing(int pwmSpeed) {
  analogWrite(PIN_MOSFET_PWM, pwmSpeed);
}`,
      metrics: [
        { label: "Dosing Accuracy", value: "± 1.5%" },
        { label: "Flow Range", value: "0.1 - 100 mL/min" },
        { label: "Cloud Alert Latency", value: "< 500ms" }
      ]
    },
    {
      id: "proj-05",
      num: "05",
      title: "Elder Guard System",
      subtitle: "ESP32 Fall Detection & Cellular Emergency Tracker",
      currentView: "Elder Guard System",
      protocol: "Cellular GSM / GPS",
      category: "Edge IoT / Safety Technology",
      year: "2026",
      abstract: "A wearable edge-IoT safety device that samples real-time motion kinematics to detect fall impacts, acquires live GPS coordinates, and dispatches automated SMS alert links alongside voice calls across cellular networks without relying on external gateways.",
      overview: "Elder Guard System is a standalone, ultra-low-power edge IoT wearable engineered to safeguard elderly individuals living independently. By running vector magnitude and orientation algorithms on high-frequency IMU data, it differentiates between daily activities and traumatic fall impacts.",
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
      result: "Prototype / development project. Achieved >94% fall classification accuracy in simulated test drops with <12s total alert dispatch latency and verified live SMS coordinate delivery.",
      status: "Functional Prototype Deployed",
      video: "assets/videos/5.mp4",
      image: "assets/images/elderguard_output.jpeg",
      poster: "assets/images/elderguard_output.jpeg",
      gallery: [
        {
          url: "assets/images/elderguard_output.jpeg",
          title: "Live GPS Fall Detection SMS Alert Output",
          caption: "Live GSM cellular SMS transmission output: 'EMERGENCY: Fall Detected! Please check immediately. Location: http://maps.google.com/maps?q=13.022687,80.155789' automatically dispatched upon kinematic impact detection."
        },
        {
          url: "assets/images/elderguard.jpg",
          title: "ElderGuard Wearable Hardware Node",
          caption: "Compact edge wearable hardware prototype integrating ESP32 dual-core MCU, MPU-6050 6-axis IMU, SIM800L cellular modem, and Neo-6M GPS antenna module."
        }
      ],
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
      id: "proj-06",
      num: "06",
      title: "Sub-Orbital Satellite & Ground Base Station Telemetry System",
      subtitle: "LoRa Sensor Downlink & Real-Time Ground Station Receiver",
      currentView: "Satellite Telemetry System",
      protocol: "433MHz LoRa Telemetry",
      category: "Space Technology / Embedded Avionics",
      year: "2024",
      abstract: "A dual-node space avionics and telemetry infrastructure consisting of an airborne satellite sensor payload that continuously samples 6-DOF inertial kinematics, barometric pressure, altitude, and laser ranging ground clearance, packaging fused multi-sensor data into lightweight binary packets for long-range LoRa radio transmission to an active ground base station.",
      overview: "A space-grade telemetry and ground tracking system engineered for CanSat sub-orbital launch vehicles and PocketQube pico-satellites. It features a complete two-node architecture: a flight-ready On-Board Computer (OBC) with multi-sensor fusion transmitting live telemetry over 433MHz LoRa, and a dedicated ground base station node connected to a dual-monitor real-time telemetry decoding and logging terminal.",
      problem: "Sub-orbital atmospheric payloads experience extreme vibration, high G-forces, and rapid temperature swings while requiring real-time telemetry downlink across several kilometers to an active ground base station without bulky transmitters.",
      objective: "Engineer a complete end-to-end space telemetry pipeline: an avionics sensor node transmitting 6-DOF IMU, barometric pressure, and laser ground clearance over LoRa, paired with a ground base station receiver that decodes, validates CRC checksums, and visualizes live flight telemetry on a base station terminal.",
      systemConcept: "The airborne satellite node executes a deterministic FreeRTOS scheduler on an ESP32: Core 0 handles I2C multi-sensor data acquisition (MPU-6050 6-DOF, BMP280 barometer/altimeter, VL53L0X ToF laser) while Core 1 packages binary telemetry frames and commands the SX1278 Ra-02 LoRa transceiver. The ground base station receiver captures RF packets, verifies CRC-16 checksums, and streams live telemetry to a dual-screen monitoring terminal over serial UART.",
      components: [
        "ESP32-WROOM-32 Dual-Core 240MHz MCU (Satellite Node)",
        "ESP32 DevKit V1 Base Station Controller",
        "SX1278 Ra-02 433MHz / 868MHz LoRa Transceiver Pair",
        "MPU-6050 6-Axis MotionTracking IMU",
        "BMP280 High-Precision Barometric Pressure & Altitude Sensor",
        "VL53L0X Time-of-Flight (ToF) Laser Distance Sensor",
        "High-Gain Omni-directional Monopole Antenna with SMA Mount",
        "Ground Base Station Dual-Screen Telemetry Monitor",
        "3.7V Lithium-Polymer Flight Battery & 3.3V Step-Down Buck Regulator"
      ],
      techStack: ["FreeRTOS Dual-Core Tasking", "LoRa Physical Layer Protocol (SX1278)", "Dual-Node Ground Telemetry", "I2C Sensor Multiplexing", "Binary Packet Serialization & CRC16", "Avionics Power Budgeting"],
      workflow: [
        "Pre-Launch Calibration: Zero ground altitude reference, calibrate gyroscope bias, and establish 433MHz LoRa handshake",
        "Ascent Phase: Continuous 50Hz sampling of barometric pressure, altitude, and vertical acceleration",
        "LoRa Packet Transmission: Satellite OBC serializes sensor data into 32-byte binary frames with CRC checksums",
        "Base Station Reception: Ground receiver node intercepts RF packets and validates integrity in real time",
        "Ground Telemetry Logging: Streams live altitude, pressure, and orientation readings to dual-monitor terminal"
      ],
      result: "Prototype / development project. Validated RF link budget over 4.2km line-of-sight with packet loss rate < 1.8% and real-time terminal packet decoding.",
      status: "Bench Tested & Flight Ready",
      image: "assets/images/satellite/sat_telemetry_terminal.jpeg",
      gallery: [
        {
          url: "assets/images/satellite/sat_telemetry_terminal.jpeg",
          title: "Ground Base Station Telemetry Terminal",
          caption: "Dual-monitor base station receiver logging and visualizing live sensor reading packets (altitude, pressure, acceleration, and distance) streamed in real-time from the satellite transceiver node."
        },
        {
          url: "assets/images/satellite/sat_base_station.jpeg",
          title: "LoRa Base Station Transceiver Node",
          caption: "Ground station receiver hardware housing an ESP32 DevKit microcontroller, SX1278 Ra-02 433MHz LoRa transceiver, status buzzer, and SMA monopole antenna in a protective enclosure."
        },
        {
          url: "assets/images/satellite/sat_sensor_rig.jpeg",
          title: "Satellite Avionics Sensor Rig & Wiring",
          caption: "Satellite payload electronics containing ESP32 core, MPU-6050 6-DOF IMU, BMP280 barometer/altimeter, VL53L0X ToF laser distance sensor, and SX1278 LoRa downlink transmitter."
        }
      ],
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
      id: "proj-07",
      num: "07",
      title: "Smart Digital Lock System for Secure Access Control",
      currentView: "Digital Lock Prototype",
      protocol: "Matrix Keypad / EEPROM",
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
      id: "proj-08",
      num: "08",
      title: "Automated Headlight Dipper",
      subtitle: "Anti-Glare Adaptive Beam",
      currentView: "Adaptive Headlight Dipper",
      protocol: "Schmitt Trigger / Analog",
      category: "Automotive Safety / Electronics",
      year: "2023",
      abstract: "An automotive safety module that samples directional illumination from approaching vehicles via shielded optical sensors, automatically switching the vehicle's headlight relay from high-beam to low-beam to eliminate oncoming driver glare before restoring standard beams.",
      overview: "A mission-critical automotive safety enhancement module designed to prevent catastrophic nighttime glare blindness. It continuously senses oncoming vehicular headlights and seamlessly triggers beam-dipping relays without requiring driver intervention.",
      problem: "High-beam glare from oncoming night traffic accounts for significant nighttime traffic accidents due to transient flash blindness. Manual headlight dipping is often neglected by distracted or fatigued drivers.",
      objective: "Construct an analog/digital automotive headlight controller with optical collimation that detects approaching high beams, filters ambient moonlight/streetlamps via hysteresis, and actuates automotive switching relays.",
      systemConcept: "A Light Dependent Resistor (LDR) seated within a narrow-aperture optical collimator tube samples oncoming photon flux. An LM358 operational amplifier acts as a precision Schmitt trigger comparator with adjustable threshold and hysteresis to prevent relay chatter. The output drives a 5V relay module via an optocoupler and BC547 transistor, switching the vehicle headlamps between high and low filaments.",
      components: [
        "LM358 Dual Precision Operational Amplifier",
        "Arduino Nano (Microcontroller Calibration Core)",
        "High-Sensitivity LDR Photocell in Optical Collimator Tube",
        "10kΩ Multi-turn Precision Calibration Potentiometer",
        "5V 2-Channel High-Current Relay Module",
        "PC817 Phototransistor Optocoupler Isolation IC",
        "BC547 NPN Driver Transistor",
        "1N4007 High-Voltage Flyback Diodes",
        "12V DC Vehicle Power Step-Down Buck Regulator"
      ],
      techStack: ["Operational Amplifier Comparators", "Schmitt Trigger Hysteresis", "Optocoupler Galvanic Isolation", "Analog Signal Conditioning", "5V Relay Switching", "Optical Collimation Physics"],
      workflow: [
        "Optical Collimation: Shielded tube restricts light acceptance angle to ±15° directly facing oncoming lane",
        "Signal Conditioning: LDR voltage divider feeds non-inverting input of LM358 comparator",
        "Threshold Comparison: Oncoming headlamps exceed calibrated V_ref; comparator output swings HIGH",
        "Galvanic Switching: PC817 optocoupler turns on BC547 transistor, energizing 5V relay coil",
        "Beam Dipping: Relay disconnects high-beam filament (55W) and engages low-beam filament (35W)",
        "Hysteresis Recovery: Once oncoming vehicle passes, signal drops below lower threshold with 1.2s delay to prevent fluttering"
      ],
      result: "Prototype / development project. Delivered anti-glare dipping response within 120ms of oncoming headlight detection in real vehicle headlamp testing.",
      status: "Bench & Road Tested",
      video: "assets/videos/8.MOV",
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
        { label: "Relay Coil", value: "5V DC" },
        { label: "Acceptance Angle", value: "±15°" }
      ]
    },
    {
      id: "proj-09",
      num: "09",
      title: "Discrete Traffic Light Control System",
      currentView: "Traffic Light Controller",
      protocol: "Discrete Clock / Logic",
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
      id: "proj-10",
      num: "10",
      title: "Microcontroller-Based Optical Pulse & Heart Rate Monitor",
      subtitle: "Optical PPG Pulse Sensor, Dynamic BPM Peak Detection & 16x2 I2C LCD Display",
      currentView: "Optical Pulse Monitor",
      protocol: "Optical PPG / I2C",
      category: "Embedded Systems / Biometric Telemetry",
      year: "2024",
      abstract: "A non-invasive biometric telemetry device powered by an ATmega328P microcontroller that reads raw optical photoplethysmography (PPG) waveforms to extract real-time heart rate (BPM), displaying dynamic cardiac telemetry on a high-contrast 16×2 I2C LCD display with edge signal conditioning.",
      overview: "A dedicated hardware biometric monitoring system designed for real-time cardiovascular telemetry. It captures pulsatile blood volume transitions using an active green LED optical photoplethysmography sensor, processes signals through an edge peak-detection algorithm, and outputs live heart rate measurements (BPM: 107) on a 16x2 character LCD over an I2C serial bus.",
      problem: "Traditional pulse monitoring equipment is often proprietary, expensive, and tethered to complex medical stations. Basic analog pulse sensors suffer from baseline motion noise and ambient light interference, requiring dedicated software filtering and responsive local visual readouts.",
      objective: "Engineer a standalone, low-noise biometric sensing unit with active optical photoplethysmography, real-time threshold-based BPM calculation, and responsive 16x2 I2C LCD telemetry.",
      systemConcept: "An ATmega328P / Arduino Uno reads analog voltage transitions from an optical pulse sensor powered by an active green LED. An interrupt-driven DSP routine computes instantaneous peak intervals to determine beats-per-minute (BPM), and continuously updates the 16x2 blue backlit LCD over I2C.",
      image: "assets/images/biometric_node.png",
      gallery: [
        {
          url: "assets/images/biometric_node.png",
          title: "Real-Time PPG Optical Heart Rate Sensor & I2C LCD Telemetry Rig",
          caption: "Live hardware demonstration of the optical photoplethysmography (PPG) pulse monitoring system. The ATmega328P microcontroller reads analog pulsatile voltage transitions from the active green LED optical pulse sensor, executes peak-detection signal processing algorithms, and streams live heart rate telemetry (BPM: 107) directly to a high-contrast 16x2 I2C blue character LCD."
        }
      ],
      components: [
        "Arduino Uno / ATmega328P Microcontroller",
        "Optical Photoplethysmography (PPG) Pulse Sensor with Active Green LED",
        "16×2 I2C Blue Backlit Character LCD Display (HD44780 / PCF8574T)",
        "I2C 2-Wire Serial Communication Interface (SDA / SCL)",
        "Analog Pulse Peak-Detection & Signal Conditioning Algorithm",
        "Active Green Optical Waveguide & Phototransistor",
        "5V Regulated USB / DC Power Rail"
      ],
      techStack: ["Embedded C / C++", "Photoplethysmography (PPG) DSP", "I2C Communication Protocol", "Analog Peak Detection", "LCD Telemetry Rendering", "Hardware Interrupt Timing"],
      workflow: [
        "Sensor Excitation: Power optical pulse sensor green emitter to penetrate skin capillary beds",
        "Signal Acquisition: Sample analog phototransistor output on ADC0 pin at 2ms intervals",
        "Digital Peak Detection: Filter baseline DC offset and detect AC systolic contraction peaks",
        "BPM Computation: Calculate time difference (IBI) between consecutive beats to derive Beats Per Minute",
        "LCD Telemetry: Transmit formatted 'HEART RATE / BPM: [val]' string over I2C to 16x2 LCD display"
      ],
      result: "Prototype / development project. Validated accurate, real-time cardiac pulse measurement (BPM: 107) with stable I2C LCD refresh rate and low jitter.",
      status: "Operational Hardware Prototype",
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
      id: "proj-11",
      num: "11",
      title: "IoT-Based Smart Classroom Monitoring System",
      subtitle: "ESP32 Bi-Directional IR Visitor Counting, LDR Lighting & 12V Fan Mobile IoT Control",
      currentView: "Smart Classroom System",
      protocol: "ESP32 Wi-Fi / MQTT",
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
  ],
  hardwareComponents: [
    {
      id: "hw-esp32",
      name: "ESP32-WROOM-32",
      category: "Microcontroller / Edge SoC",
      badge: "Dual-Core 240MHz",
      specs: {
        voltage: "3.0V - 3.6V DC",
        interface: "SPI, I2C, UART, PWM, ADC, DAC, CAN",
        package: "QFN-48 / 38-Pin SMD Module",
        keyFeature: "Integrated 2.4GHz Wi-Fi & Bluetooth 4.2 BR/EDR/BLE"
      },
      description: "High-performance dual-core Xtensa 32-bit LX6 microprocessor with dedicated cryptographic hardware acceleration and ultra-low-power coprocessor.",
      pinoutPreview: ["GPIO36 (VP)", "GPIO39 (VN)", "GPIO34", "GPIO35", "GPIO32", "GPIO33", "GPIO25 (DAC1)", "GPIO26 (DAC2)", "GPIO27", "GPIO14", "GPIO12", "GPIO13", "GND", "3V3"]
    },
    {
      id: "hw-arduino",
      name: "Arduino Nano (ATmega328P)",
      category: "8-Bit Microcontroller",
      badge: "16MHz AVR",
      specs: {
        voltage: "5V (Operating) / 7-12V (VIN)",
        interface: "UART, SPI, I2C, 6x PWM, 8x 10-bit ADC",
        package: "TQFP-32 30-Pin DIP form factor",
        keyFeature: "Deterministic single-cycle instruction execution"
      },
      description: "Compact, breadboard-friendly workhorse microcontroller with 32KB flash memory, 2KB SRAM, and 1KB non-volatile EEPROM storage.",
      pinoutPreview: ["D0 (RX)", "D1 (TX)", "D2 (INT0)", "D3 (INT1/PWM)", "D4-D12", "D13 (SCK)", "A0-A7 (ADC)", "RESET", "5V", "GND", "VIN"]
    },
    {
      id: "hw-lora",
      name: "SX1278 Ra-02 LoRa",
      category: "Sub-GHz RF Transceiver",
      badge: "433MHz / +20dBm",
      specs: {
        voltage: "1.8V - 3.7V DC",
        interface: "SPI (up to 10MHz)",
        package: "SMD-16 Module with IPEX / Spring Antenna",
        keyFeature: "Chirp Spread Spectrum (CSS) modulation"
      },
      description: "Long-range low-power spread spectrum communications transceiver with ultra-high sensitivity down to -148dBm and up to 10km line-of-sight range.",
      pinoutPreview: ["GND", "3.3V", "RESET", "DIO0 (RxDone/TxDone)", "DIO1-DIO3", "SCK", "MISO", "MOSI", "NSS (CS)"]
    },
    {
      id: "hw-mpu6050",
      name: "MPU-6050 6-DOF IMU",
      category: "Motion & Kinematic Sensor",
      badge: "Accel + Gyro + DMP",
      specs: {
        voltage: "3.0V - 5.0V (Onboard LDO)",
        interface: "I2C (Fast Mode 400kHz)",
        package: "QFN-24 4x4x0.9mm",
        keyFeature: "Digital Motion Processor (DMP) on-chip"
      },
      description: "Tri-axis angular rate sensor (gyroscope) up to ±2000°/s and tri-axis accelerometer up to ±16g with programmable digital low-pass filtering.",
      pinoutPreview: ["VCC", "GND", "SCL (Clock)", "SDA (Data)", "XDA", "XCL", "AD0 (Address LSB)", "INT (Interrupt)"]
    },
    {
      id: "hw-bmp280",
      name: "BMP280 Barometric Sensor",
      category: "Atmospheric & Altitude Sensor",
      badge: "±1 hPa / ±1 Meter",
      specs: {
        voltage: "1.71V - 3.6V DC",
        interface: "I2C & SPI interfaces",
        package: "LGA-8 2.0x2.5x0.95mm",
        keyFeature: "Ultra-low noise barometric pressure measurement"
      },
      description: "Piezo-resistive pressure sensor specifically designed for mobile avionics, rocketry apogee detection, and weather monitoring.",
      pinoutPreview: ["VCC (3.3V)", "GND", "SCL", "SDA", "CSB (Chip Select)", "SDO (SPI MISO / I2C Addr)"]
    },
    {
      id: "hw-vl53l0x",
      name: "VL53L0X Time-of-Flight",
      category: "Laser Distance Ranging",
      badge: "940nm VCSEL Laser",
      specs: {
        voltage: "2.8V - 5.0V (Module)",
        interface: "I2C (Address 0x29)",
        package: "Optical LGA 4.4x2.4x1.0mm",
        keyFeature: "Photon flight time measurement regardless of color"
      },
      description: "World's smallest FlightSense laser-ranging module providing millimeter-accurate distance readings up to 2 meters under challenging ambient light.",
      pinoutPreview: ["VCC", "GND", "SCL", "SDA", "XSHUT (Power Enable)", "GPIO1 (Interrupt)"]
    },
    {
      id: "hw-max30102",
      name: "MAX30102 High-Sensitivity",
      category: "Biometric PPG Sensor",
      badge: "SpO2 & Heart Rate",
      specs: {
        voltage: "1.8V (Core) / 3.3V-5.0V (Module)",
        interface: "I2C (Address 0x57)",
        package: "14-Pin Optical System Module",
        keyFeature: "Dual 660nm Red & 880nm IR Photodetectors"
      },
      description: "Integrated pulse oximetry and heart-rate monitor biosensor module with high-speed 18-bit ADC and ambient light cancellation.",
      pinoutPreview: ["VIN", "GND", "SCL", "SDA", "INT", "RD (Red LED Driver)", "IRD (IR LED Driver)"]
    },
    {
      id: "hw-rc522",
      name: "RC522 13.56MHz RFID",
      category: "Contactless Identification",
      badge: "MIFARE / ISO 14443A",
      specs: {
        voltage: "2.5V - 3.3V DC",
        interface: "SPI, I2C, UART",
        package: "PCB Printed Loop Antenna Module",
        keyFeature: "Up to 50mm contactless read distance"
      },
      description: "Highly integrated reader/writer IC for contactless communication based on 13.56MHz frequency with hardware Crypto1 encryption support.",
      pinoutPreview: ["SDA (NSS)", "SCK", "MOSI", "MISO", "IRQ", "GND", "RST", "3.3V"]
    },
    {
      id: "hw-sim800l",
      name: "SIM800L GPRS / GSM",
      category: "Cellular Modem Module",
      badge: "Quad-Band 2G",
      specs: {
        voltage: "3.7V - 4.2V (2A Peak)",
        interface: "UART AT Command Set",
        package: "SMD-24 15.8x17.8x2.4mm",
        keyFeature: "Autonomous voice calls, SMS, & GPRS TCP/IP"
      },
      description: "Ultra-compact cellular module for remote telemetry dispatch and autonomous emergency calling directly to cellular network towers.",
      pinoutPreview: ["NET (Antenna)", "VCC (3.7-4.2V)", "RST", "RXD (UART In)", "TXD (UART Out)", "GND", "RING", "DTR", "MIC+", "SPK+"]
    },
    {
      id: "hw-gps",
      name: "u-blox Neo-6M GNSS",
      category: "Satellite Navigation Core",
      badge: "50-Channel / 5Hz",
      specs: {
        voltage: "3.0V - 5.0V (Module)",
        interface: "UART (9600 Baud Default)",
        package: "24-Pin SMD with Active Ceramic Patch",
        keyFeature: "NMEA 0183 & UBX binary protocol output"
      },
      description: "High-sensitivity GPS receiver engine with Time-To-First-Fix (TTFF) under 1 second with Hot Start and precision coordinate tracking.",
      pinoutPreview: ["VCC", "RX", "TX", "GND", "PPS (Pulse Per Second LED)"]
    },
    {
      id: "hw-555",
      name: "NE555 Precision Timer",
      category: "Analog / Timing IC",
      badge: "Astable / Monostable",
      specs: {
        voltage: "4.5V - 16V DC",
        interface: "Analog RC Charging Nodes",
        package: "DIP-8 / SOIC-8",
        keyFeature: "High current sinking/sourcing up to 200mA"
      },
      description: "The timeless monolithic timing circuit generating precise clock pulses, square waves, and time delays from microseconds to hours.",
      pinoutPreview: ["1: GND", "2: TRIGGER", "3: OUTPUT", "4: RESET", "5: CONTROL VOLTAGE", "6: THRESHOLD", "7: DISCHARGE", "8: VCC"]
    },
    {
      id: "hw-cd4017",
      name: "CD4017 Decade Counter",
      category: "CMOS Digital Logic IC",
      badge: "5-Stage Johnson Counter",
      specs: {
        voltage: "3.0V - 18V DC",
        interface: "Digital Clock In / 10 Decoded High Outputs",
        package: "DIP-16 / SO-16",
        keyFeature: "Fully static operation up to 5MHz clock"
      },
      description: "5-stage Johnson counter with 10 decoded active-high output pins used in sequential state machines, LED matrices, and divider chains.",
      pinoutPreview: ["Q0-Q9 (Outputs)", "13: CLOCK INHIBIT", "14: CLOCK IN", "15: RESET", "16: VDD", "8: VSS (GND)", "12: CARRY OUT"]
    },
    {
      id: "hw-relays",
      name: "Opto-Isolated Relay Core",
      category: "Power Actuation & Isolation",
      badge: "250VAC 10A / 30VDC 10A",
      specs: {
        voltage: "5V Coil (15-20mA trigger)",
        interface: "Digital Logic Level Input",
        package: "Sealed Electromechanical Sugar Cube",
        keyFeature: "Galvanic optical isolation via PC817 optocoupler"
      },
      description: "High-current electromechanical switching units protecting sensitive logic controllers from inductive kicks, high AC mains, and DC solenoid loads.",
      pinoutPreview: ["VCC", "GND", "IN (Active LOW/HIGH)", "COM (Common)", "NO (Normally Open)", "NC (Normally Closed)"]
    }
  ],
  researchTopics: [
    {
      id: "res-optical",
      num: "01",
      title: "Adaptive Optical Safety System",
      focus: "Signal Gradient & Baseline Tracking",
      mathNotation: "dI/dt = lim (I(t) - I(t-Δt)) / Δt,  Baseline: B(t) = α·I(t) + (1-α)·B(t-1)",
      abstract: "Investigates transient derivative thresholding versus classical static amplitude bounds in high-speed optical beam interruption systems to decouple daylight solar drift from physical obstruction events.",
      keyInsights: [
        "Dynamic Exponential Moving Average (EMA) baseline suppresses slow diurnal solar ramps up to 1000 Lux/s.",
        "First-order derivative dI/dt isolates high-velocity intrusion signatures in under 1.8 milliseconds.",
        "Dual-condition validation reduces false industrial line halt alarms by 99.8%."
      ],
      simulationMetrics: [
        { label: "Sampling Rate", value: "10 kHz" },
        { label: "Detection Delay", value: "1.8 ms" },
        { label: "False Positive Rejection", value: "99.8%" }
      ],
      algorithmType: "derivative"
    },
    {
      id: "res-eeg",
      num: "02",
      title: "EEG Signal Decoding & Feature Extraction",
      focus: "Bio-Potential Spectral Decomposition",
      mathNotation: "X(k) = Σ x(n)·e^(-j2πkn/N)  ==>  PSD P(ω) = |X(ω)|²",
      abstract: "Computational framework for non-invasive electroencephalogram (EEG) pre-processing, 50Hz notch filtering, Wavelet Denoising, and Power Spectral Density (PSD) estimation across Alpha (8-12Hz) and Beta (13-30Hz) bands.",
      keyInsights: [
        "Butterworth 4th-order bandpass filtering isolates microvolt neural potentials from muscle artifacts.",
        "Continuous Wavelet Transform (CWT) localized time-frequency representation captures transient ERP spikes.",
        "Fast Fourier Transform (FFT) extraction of band power ratios for cognitive state classification."
      ],
      simulationMetrics: [
        { label: "Signal Bandwidth", value: "0.5 - 60 Hz" },
        { label: "SNR Improvement", value: "+ 18.4 dB" },
        { label: "Resolution", value: "24-bit ADC" }
      ],
      algorithmType: "fourier"
    },
    {
      id: "res-elm",
      num: "03",
      title: "Extreme Learning Machine (ELM)",
      focus: "Fast Single-Hidden Layer Feedforward Neural Networks",
      mathNotation: "β = H†·T = (Hᵀ·H)⁻¹·Hᵀ·T",
      abstract: "Analysis of non-iterative generalized inverse learning for single-hidden layer feedforward networks (SLFNs). Random input weights and biases require only analytical computation of output weights via Moore-Penrose pseudoinverse.",
      keyInsights: [
        "Extremely rapid training speeds (orders of magnitude faster than backpropagation gradient descent).",
        "Avoids local minima and learning rate hyperparameter sensitivity issues.",
        "Suitable for real-time edge embedded classification on memory-constrained microcontrollers."
      ],
      simulationMetrics: [
        { label: "Training Speedup", value: "120x vs BP" },
        { label: "Hidden Neurons", value: "64 Nodes" },
        { label: "Inference Time", value: "0.4 ms" }
      ],
      algorithmType: "neural"
    },
    {
      id: "res-hmm",
      num: "04",
      title: "Hidden Markov Model (HMM)",
      focus: "Stochastic Temporal Sequence Modeling",
      mathNotation: "P(O|λ) = Σ P(O,Q|λ),  Viterbi: V(t,k) = max (V(t-1,x)·a_xk)·b_k(o_t)",
      abstract: "Stochastic modeling of hidden internal hardware states and failure modes through observable sequence telemetry using Baum-Welch training and Viterbi optimal state trajectory decoding.",
      keyInsights: [
        "Decodes latent degradation stages in industrial rotating machinery before complete failure.",
        "Computes probability distributions of sensor failure vs true environmental shifts.",
        "Optimal Viterbi path estimation on streaming time-series sensor observations."
      ],
      simulationMetrics: [
        { label: "State Count", value: "4 Hidden States" },
        { label: "Sequence Length", value: "1024 Steps" },
        { label: "Decoding Jitter", value: "< 5 ms" }
      ],
      algorithmType: "markov"
    },
    {
      id: "res-affinity",
      num: "05",
      title: "Affinity Propagation",
      focus: "Message-Passing Exemplar Clustering",
      mathNotation: "r(i,k) <-- s(i,k) - max[a(i,k') + s(i,k')],  a(i,k) <-- min(0, r(k,k) + Σ max(0, r(i',k)))",
      abstract: "Unsupervised clustering algorithm that identifies exemplars by exchanging real-valued responsibility and availability messages between data points without pre-specifying the cluster count k.",
      keyInsights: [
        "Simultaneously evaluates all sensor data points as potential cluster exemplars.",
        "Eliminates initialization bias inherent in k-means clustering.",
        "Automatically discovers natural operating regimes in multi-sensor IoT telemetry."
      ],
      simulationMetrics: [
        { label: "Cluster Convergence", value: "42 Iterations" },
        { label: "Damping Factor λ", value: "0.75" },
        { label: "Silhouette Score", value: "0.84" }
      ],
      algorithmType: "clustering"
    },
    {
      id: "res-structural",
      num: "06",
      title: "IoT Structural Health Monitoring",
      focus: "Vibrational Modal Analysis & Wavelet Decomposition",
      mathNotation: "ω_n = √(k/m),  ψ_a,b(t) = (1/√|a|)·ψ((t-b)/a)",
      abstract: "Continuous structural integrity surveillance utilizing synchronized wireless IMU nodes to detect micro-strain, resonant frequency shifts, and material fatigue in civil and mechanical structures.",
      keyInsights: [
        "Sub-millihertz spectral resolution in detecting resonant frequency drift.",
        "Edge-computed fast Wavelet transforms reduce wireless LoRa packet transmission load by 92%.",
        "Early warning thresholding for civil bridge and tower vibration anomalies."
      ],
      simulationMetrics: [
        { label: "Dynamic Range", value: "120 dB" },
        { label: "Bandwidth", value: "0.1 - 200 Hz" },
        { label: "Node Sync Error", value: "< 50 μs" }
      ],
      algorithmType: "wavelet"
    }
  ],
  journeyMilestones: [
    {
      year: "2025 – 2029",
      stage: "ACADEMICS",
      title: "B.E. in Electronics & Communication Engineering (ECE)",
      focus: "SIMATS University, Chennai • CGPA: 8.38 • Embedded Systems & IoT",
      description: "Undergraduate engineering program focusing on embedded systems, microcontroller firmware (C/C++), wireless IoT architectures, sensor network topologies, and deterministic hardware circuit design with an active academic CGPA of 8.38.",
      deliverables: ["CGPA: 8.38 (Academic Standing)", "Embedded Firmware (C/C++)", "Microcontroller Architectures", "Sensor Network Topologies", "Hardware Prototyping"],
      badge: "CGPA 8.38 • SIMATS"
    },
    {
      year: "2025",
      stage: "RECOGNITION",
      title: "Best Capstone Project Award — Smart Parking Infrastructure",
      focus: "Award of Excellence • Sensor Multiplexing & Power Optimization",
      description: "Won the Best Capstone Project Award for architecting an intelligent IoT parking management system with multiplexed IR and ultrasonic sensor grids, achieving sub-second bay occupancy detection and energy-efficient standby.",
      deliverables: ["Award of Excellence (2025)", "Multiplexed IR/Ultrasonic Grids", "Real-Time Occupancy Telemetry", "Energy-Efficient Standby Circuit"],
      badge: "Award of Excellence"
    },
    {
      year: "2026",
      stage: "HARDWARE R&D",
      title: "Autonomous Embedded Systems & IoT Deployments",
      focus: "ESP32, MPU6050 6-DOF IMU, NEO-6M GPS, SIM800L & Blynk Cloud",
      description: "Engineered and validated multiple mission-critical IoT systems: Elder Guard wearable fall detector with jerk-math filtering, automated chemical precision dosing platform with closed-loop PWM, and smart classroom energy automation.",
      deliverables: ["ElderGuard Wearable v26", "Automated Precision Dosing System", "Smart Classroom Automation", "USB HID Sim Racing Controller"],
      badge: "Systems & Firmware"
    },
    {
      year: "2026",
      stage: "CISCO CERTIFIED",
      title: "Cisco Networking Academy — Networking Basics",
      focus: "Verified Course Certificate, Digital Badge & 5 Module Achievements",
      description: "Earned official Cisco Networking Academy verified credentials in 'Networking Basics' (Course Certificate & Badge issued Feb 02, 2026) along with 5 individual module achievements covering network fundamentals, IPv4/IPv6 architectures, communications, protocols, and access layers.",
      deliverables: [
        "Cisco Verified Course Badge: Networking Basics",
        "Cisco Course Certificate: Networking Basics (Issued: Feb 02, 2026)",
        "Module Achievement: Network Basics (Issued: Jan 19, 2026)",
        "Module Achievement: Internet Protocol Basics (Issued: Jan 19, 2026)",
        "Module Achievement: Network Communications Basics (Issued: Jan 19, 2026)",
        "Module Achievement: Networking Protocols Basics (Issued: Jan 18, 2026)",
        "Module Achievement: Network Access Basics (Issued: Jan 18, 2026)"
      ],
      badge: "Cisco Verified"
    },
    {
      year: "2026",
      stage: "CERTIFICATIONS & CAMPS",
      title: "NPTEL IoT Certification & Field Leadership",
      focus: "NPTEL Swayam (IIT) • The Bharat Scouts & Guides",
      description: "Completed NPTEL certification in Internet of Things (IoT), and actively participated in field camps, outdoor survival training, and community leadership with The Bharat Scouts and Guides.",
      deliverables: ["NPTEL Internet of Things (IoT) Certified", "The Bharat Scouts & Guides Camps", "Embedded Telemetry & Networks", "Field Camp Leadership"],
      badge: "NPTEL & Scouts"
    }
  ]
};
