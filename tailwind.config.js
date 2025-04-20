/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				// Fade animations
				"fade-in": {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
				"fade-out": {
					from: { opacity: 1 },
					to: { opacity: 0 },
				},
				"fade-in-up": {
					from: { opacity: 0, transform: "translateY(10px)" },
					to: { opacity: 1, transform: "translateY(0)" },
				},
				"fade-in-down": {
					from: { opacity: 0, transform: "translateY(-10px)" },
					to: { opacity: 1, transform: "translateY(0)" },
				},
				"fade-in-left": {
					from: { opacity: 0, transform: "translateX(-10px)" },
					to: { opacity: 1, transform: "translateX(0)" },
				},
				"fade-in-right": {
					from: { opacity: 0, transform: "translateX(10px)" },
					to: { opacity: 1, transform: "translateX(0)" },
				},

				// Scale animations
				"scale-in": {
					from: { opacity: 0, transform: "scale(0.95)" },
					to: { opacity: 1, transform: "scale(1)" },
				},
				"scale-out": {
					from: { opacity: 1, transform: "scale(1)" },
					to: { opacity: 0, transform: "scale(0.95)" },
				},
				"scale-up": {
					from: { transform: "scale(1)" },
					to: { transform: "scale(1.05)" },
				},
				"scale-down": {
					from: { transform: "scale(1.05)" },
					to: { transform: "scale(1)" },
				},

				// Slide animations
				"slide-up": {
					from: { transform: "translateY(20px)", opacity: 0 },
					to: { transform: "translateY(0)", opacity: 1 },
				},
				"slide-down": {
					from: { transform: "translateY(-20px)", opacity: 0 },
					to: { transform: "translateY(0)", opacity: 1 },
				},
				"slide-left": {
					from: { transform: "translateX(20px)", opacity: 0 },
					to: { transform: "translateX(0)", opacity: 1 },
				},
				"slide-right": {
					from: { transform: "translateX(-20px)", opacity: 0 },
					to: { transform: "translateX(0)", opacity: 1 },
				},

				// Rotate animations
				"rotate-in": {
					from: { transform: "rotate(-10deg)", opacity: 0 },
					to: { transform: "rotate(0)", opacity: 1 },
				},
				"rotate-out": {
					from: { transform: "rotate(0)", opacity: 1 },
					to: { transform: "rotate(10deg)", opacity: 0 },
				},
				"spin-slow": {
					from: { transform: "rotate(0deg)" },
					to: { transform: "rotate(360deg)" },
				},

				// Bounce animations
				"bounce-in": {
					"0%": { transform: "scale(0.3)", opacity: 0 },
					"50%": { transform: "scale(1.05)", opacity: 0.8 },
					"70%": { transform: "scale(0.9)", opacity: 0.9 },
					"100%": { transform: "scale(1)", opacity: 1 },
				},
				"bounce-out": {
					"0%": { transform: "scale(1)", opacity: 1 },
					"20%": { transform: "scale(1.1)", opacity: 0.9 },
					"100%": { transform: "scale(0.3)", opacity: 0 },
				},

				// Pulse animations
				"pulse-slow": {
					"0%, 100%": { opacity: 1 },
					"50%": { opacity: 0.5 },
				},
				"pulse-subtle": {
					"0%, 100%": { opacity: 1 },
					"50%": { opacity: 0.8 },
				},

				// Shake animations
				shake: {
					"0%, 100%": { transform: "translateX(0)" },
					"10%, 30%, 50%, 70%, 90%": { transform: "translateX(-2px)" },
					"20%, 40%, 60%, 80%": { transform: "translateX(2px)" },
				},

				// Accordion animations
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},

				// Gradient animations
				"gradient-shift": {
					"0%": { backgroundPosition: "0% 50%" },
					"50%": { backgroundPosition: "100% 50%" },
					"100%": { backgroundPosition: "0% 50%" },
				},

				// Shimmer effect
				shimmer: {
					"0%": { backgroundPosition: "-200% 0" },
					"100%": { backgroundPosition: "200% 0" },
				},
			},
			animation: {
				// Fade animations
				"fade-in": "fade-in 0.5s ease-out forwards",
				"fade-out": "fade-out 0.5s ease-out forwards",
				"fade-in-up": "fade-in-up 0.5s ease-out forwards",
				"fade-in-down": "fade-in-down 0.5s ease-out forwards",
				"fade-in-left": "fade-in-left 0.5s ease-out forwards",
				"fade-in-right": "fade-in-right 0.5s ease-out forwards",

				// Scale animations
				"scale-in": "scale-in 0.3s ease-out forwards",
				"scale-out": "scale-out 0.3s ease-out forwards",
				"scale-up": "scale-up 0.2s ease-out forwards",
				"scale-down": "scale-down 0.2s ease-out forwards",

				// Slide animations
				"slide-up": "slide-up 0.5s ease-out forwards",
				"slide-down": "slide-down 0.5s ease-out forwards",
				"slide-left": "slide-left 0.5s ease-out forwards",
				"slide-right": "slide-right 0.5s ease-out forwards",

				// Rotate animations
				"rotate-in": "rotate-in 0.5s ease-out forwards",
				"rotate-out": "rotate-out 0.5s ease-out forwards",
				"spin-slow": "spin-slow 3s linear infinite",

				// Bounce animations
				"bounce-in":
					"bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards",
				"bounce-out":
					"bounce-out 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards",

				// Pulse animations
				"pulse-slow": "pulse-slow 3s ease-in-out infinite",
				"pulse-subtle": "pulse-subtle 2s ease-in-out infinite",

				// Shake animation
				shake: "shake 0.5s cubic-bezier(.36,.07,.19,.97) both",

				// Accordion animations
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",

				// Gradient animation
				"gradient-shift": "gradient-shift 3s ease infinite",

				// Shimmer effect
				shimmer: "shimmer 2s linear infinite",
			},
			transitionProperty: {
				height: "height",
				spacing: "margin, padding",
				width: "width",
				transform: "transform",
				colors:
					"color, background-color, border-color, text-decoration-color, fill, stroke",
				opacity: "opacity",
				shadow: "box-shadow",
				filter: "filter",
				backdrop: "backdrop-filter",
				all: "all",
			},
			transitionDuration: {
				0: "0ms",
				75: "75ms",
				100: "100ms",
				150: "150ms",
				200: "200ms",
				300: "300ms",
				500: "500ms",
				700: "700ms",
				1000: "1000ms",
			},
			transitionTimingFunction: {
				"in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
				"out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
				"in-out-expo": "cubic-bezier(1, 0, 0, 1)",
				"in-circ": "cubic-bezier(0.6, 0.04, 0.98, 0.335)",
				"out-circ": "cubic-bezier(0.075, 0.82, 0.165, 1)",
				"in-out-circ": "cubic-bezier(0.785, 0.135, 0.15, 0.86)",
				"in-back": "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
				"out-back": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
				"in-out-back": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
				"in-elastic": "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
				"out-elastic": "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
				"in-out-elastic": "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
			},
		},
	},
	plugins: [],
};
