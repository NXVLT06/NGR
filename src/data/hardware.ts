export interface HardwareComponent {
  id: string;
  name: string;
  category: string;
  badge: string;
  icon: string;
  specs: {
    voltage: string;
    interface: string;
    package: string;
    keyFeature: string;
  };
  description: string;
  pinoutPreview: string[];
}

export const hardwareComponents: HardwareComponent[] = [
  {
    id: "hw-esp32",
    name: "ESP32-WROOM-32",
    category: "Microcontroller / Edge SoC",
    badge: "Dual-Core 240MHz",
    icon: "Cpu",
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
    icon: "Layers",
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
    icon: "Radio",
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
    icon: "Compass",
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
    icon: "Gauge",
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
    icon: "Target",
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
    icon: "Activity",
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
    icon: "CreditCard",
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
    icon: "Smartphone",
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
    icon: "Navigation",
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
    icon: "Clock",
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
    icon: "Sliders",
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
    icon: "Zap",
    specs: {
      voltage: "5V Coil (15-20mA trigger)",
      interface: "Digital Logic Level Input",
      package: "Sealed Electromechanical Sugar Cube",
      keyFeature: "Galvanic optical isolation via PC817 optocoupler"
    },
    description: "High-current electromechanical switching units protecting sensitive logic controllers from inductive kicks, high AC mains, and DC solenoid loads.",
    pinoutPreview: ["VCC", "GND", "IN (Active LOW/HIGH)", "COM (Common)", "NO (Normally Open)", "NC (Normally Closed)"]
  }
];
