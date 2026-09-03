/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        canteen: {
          50:'#fff8eb',100:'#ffefc7',200:'#ffdd8a',300:'#ffc14d',400:'#ffa620',
          500:'#f98307',600:'#dd6002',700:'#b74106',800:'#94310c',900:'#7a290d',
        },
        chat: {
          50:'#f0f9f4',100:'#dcf2ce',200:'#bbe5a0',300:'#8dd068',400:'#5fb339',
          500:'#3d9425',600:'#2c751c',700:'#255c1a',800:'#204a1b',900:'#1b3e19',
        },
      },
      animation: {
        'slide-up':'slideUp 0.3s ease-out',
        'slide-in':'slideIn 0.35s ease-out',
        'fade-in':'fadeIn 0.2s ease-out',
        'pulse-slow':'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'bounce-subtle':'bounceSubtle 0.4s ease-out',
      },
      keyframes: {
        slideUp: {'0%':{opacity:'0',transform:'translateY(10px)'},'100%':{opacity:'1',transform:'translateY(0)'}},
        slideIn: {'0%':{opacity:'0',transform:'translateX(-12px)'},'100%':{opacity:'1',transform:'translateX(0)'}},
        fadeIn: {'0%':{opacity:'0'},'100%':{opacity:'1'}},
        bounceSubtle: {'0%,100%':{transform:'translateY(0)'},'50%':{transform:'translateY(-3px)'}},
      },
    },
  },
  plugins: [],
};
