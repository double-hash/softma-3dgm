// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
const float frequence = 10.0;
const float amplitude = 0.15;
const float lineWidth = 3.0;

vec3 plotSinWave(vec2 currentUv, float freq, float amp, vec3 color, vec3 bgc)
{
    float dx = lineWidth / u_resolution.x;
    // float dy = lineWidth / u_resolution.y; //dont use this line, or you may want check what is gonna happen
    float dy = lineWidth / u_resolution.y + sin(dx * freq) * amp;
    
	float sy = sin(currentUv.x * freq + u_time) * amp;
    
    float alpha = smoothstep(0.0, dy, abs(currentUv.y - sy));
    
    return mix(color, bgc, alpha);
}

// vec3 plotSinWave(vec2 currentUv, float freq, float amp, vec3 color, vec3 bgc)
// {
//     float dx = lineWidth / u_resolution.x;
//     float dy = lineWidth / u_resolution.y + sin(dx * freq) * amp;// + sin(dx * freq) * amp;
    
//     float sy = sin(currentUv.x * freq + u_time) * amp;
//     float dsy = cos(currentUv.x * freq + u_time) * amp * freq;

//     float alpha = smoothstep(0.0, dy, (abs(currentUv.y - sy))/sqrt(1.0+dsy*dsy));
    
//     return mix(color, bgc, alpha);
// }

float genRange(float s, float e, float d) //generate range : s - e - s in duration d, linear interpolate
{
	float c = mod(u_time * 0.9, d);
	float halfTime = d / 2.0;
	if(c - halfTime <= 0.0)
		return s * (1.0 - c / halfTime) + e * (c / halfTime);
	else
		return s + abs(e - s) - (c - halfTime) / halfTime * abs(e - s);
}

void main()
{
    // Coordonnées normalisées de 0 a 1
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    
    // Coord normalisées de -0.5 to 0.5)
    uv -= 0.5;
    
    // On multiplie l'axe x par l'aspect ratio du viewport, pour avoir des coordonnées normalisées proportionnées aux axes
    uv.x *= u_resolution.x / u_resolution.y;
   // vec2 uv = (gl_FragCoord.xy - u_resolution.xy * vec2(0.5, 0.5)) / u_resolution.y;
    vec3 plottedColor;
    
    //sin wave
    plottedColor = plotSinWave(uv, frequence, amplitude, vec3(0.0, 1.0, 0.0), plottedColor);
    
    gl_FragColor = vec4(plottedColor, 1.0);
}