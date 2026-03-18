# decode_with_python.py - helper to analyze morse audio pulses (beginner friendly)
import wave, struct, numpy as np, sys

def read_wav(path):
    wf = wave.open(path, 'rb')
    fr = wf.getframerate(); n = wf.getnframes()
    data = wf.readframes(n)
    samples = struct.unpack('<' + 'h'*n, data)
    return samples, fr

def detect_pulses(samples, fr, threshold=500):
    # convert to absolute amplitudes and downsample for speed
    amp = [abs(s) for s in samples]
    # boolean: above threshold (tone) or below (silence)
    tone = [1 if a > threshold else 0 for a in amp]
    # group contiguous runs and measure durations in seconds
    runs = []
    prev = tone[0]; count = 1
    for t in tone[1:]:
        if t == prev:
            count += 1
        else:
            runs.append((prev, count/fr))
            prev = t; count = 1
    runs.append((prev, count/fr))
    return runs

if __name__ == '__main__':
    path = 'morse_HELP.wav' if len(sys.argv) < 2 else sys.argv[1]
    samples, fr = read_wav(path)
    runs = detect_pulses(samples, fr)
    for state, dur in runs[:200]:
        print(('TONE ' if state==1 else 'SILENCE') + f\": {dur:.3f} s\")
    print('\\nNote: look for patterns of TONE durations ~ dot or dash and SILENCE durations for gaps.')