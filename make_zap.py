import wave, struct, math, random

sample_rate = 44100
duration = 0.4
num_samples = int(sample_rate * duration)

with wave.open('public/zap.wav', 'w') as f:
    f.setnchannels(1)
    f.setsampwidth(2)
    f.setframerate(sample_rate)
    
    for i in range(num_samples):
        t = i / float(sample_rate)
        
        # High pitch zap
        freq = 3000 * math.exp(-20 * t) + 100
        val = math.sin(2 * math.pi * freq * t)
        
        # Noise for crackle
        val += (random.random() * 2 - 1) * 0.5
        
        # Envelope
        env = math.exp(-10 * t)
        
        val = val * env * 20000
        val = max(min(int(val), 32767), -32768)
        
        f.writeframes(struct.pack('h', val))
