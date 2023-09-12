
const quotes = [
    "Friends are the family we choose.” — Jennifer Aniston",
    "My purpose: to lift your spirit and to motivate you.” — Mavis Staples",
    "Kindness is one thing you can’t give away. It always comes back.” — George Skolsky",
    "Great things happen to those who don't stop believing, trying, learning, and being grateful.” ― Roy T. Bennett",
    "Try to be a rainbow in someone else’s cloud.” — Maya Angelou",
    "Sometimes, when things are falling apart, they may actually be falling into place.” — Unknown",
    "Fight for the things that you care about, but do it in a way that will lead others to join you.” — Ruth Bader Ginsburg",
    "Happiness is not by chance but by choice.” — Jim Rohn",
    "Nothing is impossible, the word itself says ‘I’m possible.’” — Audrey Hepburn",
    "The most important thing is to try and inspire people so that they can be great in whatever they want to do.” – Kobe Bryant",
    "It's your outlook on life that counts. If you take yourself lightly and don't take yourself too seriously, pretty soon you can find the humor in our everyday lives. And sometimes it can be a lifesaver.” – Betty White",
    "Once you replace negative thoughts with positive ones, you'll start having positive results.” – Willie Nelson",
    "Positive anything is better than negative nothing.” – Elbert Hubbard",
    "Each day comes bearing its gifts. Untie the ribbon.” — Ann Ruth Schabacker",
    "If you don’t like the road you’re walking, start paving another one.” — Dolly Parton",
    "A dead end is just a good place to turn around.” — Naomi Judd",
    "In every day, there are 1,440 minutes. That means we have 1,440 daily opportunities to make a positive impact.” — Les Brown",
    "Even miracles take a little time” — The Fairy Godmother, Cinderella",
    "Just keep swimming” — Dory, Finding Nemo",
    "It’s a whole lot more satisfying to reach for the stars, even if you end up landing only on the moon.” — Kermit the Frog, The Muppets",
    "Always let your conscience be your guide.” — Jiminy Cricket, Pinocchio",
    "If it wasn’t hard, everyone would do it. It’s the hard that makes it great.” —Tom Hanks",
    "Perpetual optimism is a force multiplier.” — Colin Powell",
    "Pessimism leads to weakness, optimism to power.” — William James",
    "One of the things I learned the hard way was that it doesn’t pay to get discouraged. Keeping busy and making optimism a way of life can restore your faith in yourself.”– Lucille Ball",
    "Say something positive, and you’ll see something positive.” – Jim Thompson",
    "Choose to be optimistic, it feels better.” – Dali Lama",
    "Optimism is a happiness magnet. If you stay positive good things and good people will be drawn to you.” – Mary Lou Retton",
    "Be yourself, everyone else is already taken.” — Oscar Wilde",
    "When I’m not feeling my best I ask myself, 'What are you gonna do about it?” I use the negativity to fuel the transformation into a better me.” ― Beyonce",
    "Believing you are unworthy of love and belonging—that who you are authentically is a sin or is wrong—is deadly. Who you are is beautiful and amazing.” ― Laverne Cox",
    "You can, you should, and if you’re brave enough to start, you will.” ― Stephen King",
    "Speak your mind, even if your voice shakes.” — Maggie Kuhn",
    "You’re braver than you believe, and stronger than you seem, and smarter than you think.” — A.A. Mine",
    "Find out who you are and do it on purpose.” — Dolly Parton",
    "Live life to the fullest, and focus on the positive.” — Matt Cameron",
    "You’ll never do a whole lot unless you’re brave enough to try.” — Dolly Parton",
    "Always turn a negative situation into a positive situation.” – Michael Jordan",
    "Every strike brings me closer to a home run.” — Babe Ruth",
    "Life is like a bicycle. To keep your balance, you must keep moving.” — Albert Einstein",
    "Setting goals is the first step in turning the invisible into the visible.” — Tony Robbins",
    "Know what sparks the light in you. Then use that light to illuminate the world.” — Oprah Winfrey",
    "You only live once, but if you do it right, once is enough.” — Mae West",
    "The greatest glory in living lies not in never failing, but in rising every time we fail.” — Nelson Mandela",
    "Your attitude is critical to success. If you expect things to be difficult, it will always be easier to solve problems, overcome adversity, and have an enthusiastic energy about how you go about and enjoy your work.” – Nick Saban",
    "You're going to go through tough times - that's life. But I say, 'Nothing happens to you, it happens for you.' See the positive in negative events.” — Joel Osteen",
    "Success is falling nine times and getting up ten.” — Jon Bon Jovi",
    "Don’t waste a minute not being happy. If one window closes, run to the next window—or break down a door.” — Brooke Shields",
    "The key to life when things get tough is to just keep moving. Just keep moving.” — Tyler Perry",
    "Life’s battles don’t always go to the stronger or faster man. But sooner or later, the man who wins is the man who thinks he can.” – Vince Lombardi",
    "Success is only meaningful and enjoyable if it feels like your own.” — Michelle Obama",
    "The way I see it, if you want the rainbow, you gotta put up with the rain!” — Dolly Parton",
    "We cannot direct the wind, but we can adjust the sails.” — Dolly Parton",
    "Be so happy that, when other people look at you, they become happy too.” — Anonymous",
    "Be the change that you wish to see in the world.” — Mahatma Gandhi"
  ];


  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    console.log("Getting quote")
    return quotes[randomIndex];
  }

  export default getRandomQuote;