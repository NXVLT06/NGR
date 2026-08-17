export interface ResearchTopic {
  id: string;
  num: string;
  title: string;
  focus: string;
  mathNotation: string;
  abstract: string;
  keyInsights: string[];
  simulationMetrics: { label: string; value: string }[];
  algorithmType: 'derivative' | 'fourier' | 'neural' | 'markov' | 'clustering' | 'wavelet';
}

export const researchTopics: ResearchTopic[] = [
  {
    id: "res-optical",
    num: "01",
    title: "Adaptive Optical Safety System",
    focus: "Signal Gradient & Baseline Tracking",
    mathNotation: "dI/dt = \\lim_{\\Delta t \\to 0} \\frac{I(t) - I(t-\\Delta t)}{\\Delta t} \\quad \\text{where } B_t = \\alpha I_t + (1-\\alpha)B_{t-1}",
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
    mathNotation: "X(k) = \\sum_{n=0}^{N-1} x(n) e^{-j 2\\pi k n / N} \\implies P(\\omega) = |X(\\omega)|^2",
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
    mathNotation: "\\mathbf{\\beta} = \\mathbf{H}^{\\dagger} \\mathbf{T} = (\\mathbf{H}^T \\mathbf{H})^{-1} \\mathbf{H}^T \\mathbf{T}",
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
    mathNotation: "P(O | \\lambda) = \\sum_{Q} P(O, Q | \\lambda) \\quad \\text{Viterbi: } V_{t,k} = \\max_{x} (V_{t-1,x} a_{x,k}) \\cdot b_k(o_t)",
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
    mathNotation: "r(i,k) \\leftarrow s(i,k) - \\max_{k' \\neq k} \\{ a(i,k') + s(i,k') \\}, \\quad a(i,k) \\leftarrow \\min \\left( 0, r(k,k) + \\sum_{i' \\notin \\{i,k\\}} \\max(0, r(i',k)) \\right)",
    abstract: "Unsupervised clustering algorithm that identifies exemplars by exchanging real-valued responsibility and availability messages between data points without pre-specifying the cluster count k.",
    keyInsights: [
      "Simultaneously evaluates all sensor data points as potential cluster exemplars.",
      "Eliminates initialization bias inherent in k-means clustering.",
      "Automatically discovers natural operating regimes in multi-sensor IoT telemetry."
    ],
    simulationMetrics: [
      { label: "Cluster Convergence", value: "42 Iterations" },
      { label: "Damping Factor \\lambda", value: "0.75" },
      { label: "Silhouette Score", value: "0.84" }
    ],
    algorithmType: "clustering"
  },
  {
    id: "res-structural",
    num: "06",
    title: "IoT Structural Health Monitoring",
    focus: "Vibrational Modal Analysis & Wavelet Decomposition",
    mathNotation: "\\omega_n = \\sqrt{\\frac{k}{m}}, \\quad \\psi_{a,b}(t) = \\frac{1}{\\sqrt{|a|}} \\psi \\left( \\frac{t-b}{a} \\right)",
    abstract: "Continuous structural integrity surveillance utilizing synchronized wireless IMU nodes to detect micro-strain, resonant frequency shifts, and material fatigue in civil and mechanical structures.",
    keyInsights: [
      "Sub-millihertz spectral resolution in detecting resonant frequency drift.",
      "Edge-computed fast Wavelet transforms reduce wireless LoRa packet transmission load by 92%.",
      "Early warning thresholding for civil bridge and tower vibration anomalies."
    ],
    simulationMetrics: [
      { label: "Dynamic Range", value: "120 dB" },
      { label: "Bandwidth", value: "0.1 - 200 Hz" },
      { label: "Node Sync Error", value: "< 50 \\mu s" }
    ],
    algorithmType: "wavelet"
  }
];
