import wave
import math
import struct
import random

def generate_flicker_buzz(filename):
    sample_rate = 44100
    duration_s = 0.6
    num_samples = int(duration_s * sample_rate)
    
    with wave.open(filename, 'w') as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(sample_rate)
        
        for i in range(num_samples):
            t = float(i) / sample_rate
            
            # 60Hz hum component (base electrical sound)
            hum = math.sin(2 * math.pi * 60 * t)
            
            # Zap component (higher pitch starting high, snapping lower)
            zap_freq = 1500 * math.exp(-15 * t)
            zap = math.sin(2 * math.pi * zap_freq * t) if t < 0.15 else 0
            
            # Noise for the electrical crackle (flickering neon)
            noise = random.uniform(-1, 1) * (math.exp(-10 * t) + 0.05)
            
            val = (hum * 0.4) + (zap * 0.5) + (noise * 0.3)
            
            # Fade out envelope
            envelope = 1.0 - (t / duration_s)
            
            # Increase volume/amplitude
            sample = int(val * envelope * 24000)
            
            # Clip limits
            if sample > 32767: sample = 32767
            if sample < -32768: sample = -32768
            
            wav_file.writeframes(struct.pack('h', sample))

if __name__ == '__main__':
    generate_flicker_buzz("public/neon-zip.wav")
    print("Created public/neon-zip.wav")
