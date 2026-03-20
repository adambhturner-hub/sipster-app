export type PillarType = 'Foundations' | 'Spirit Journeys' | 'Era & Culture' | 'Technique School';
export type DifficultyLabel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation?: string;
}

export interface Lesson {
    id: string; // url slug
    title: string;
    pillar: PillarType;
    difficulty: DifficultyLabel;
    tags: string[]; // e.g. ['Structure'], ['Spirit'], ['History'], ['Technique']
    description: string;
    content: string[]; // Minimum 3 paragraphs
    whyItMatters: string[]; // 2-3 bullet points mapping knowledge to confidence
    keyTakeaways: string[];
    knowBeforeYouOrder?: string[]; // Optional, strictly used for Spirit Journeys
    featuredCocktailId: string; // Must perfectly match a cocktail exact name in the db
    quiz: QuizQuestion[]; // 2-3 questions for auto-completion
    tutorContextualPrompts?: string[]; // Custom pre-filled 'Ask Sipster' prompts
}

export const BOOZIVERSITY_LESSONS: Lesson[] = [
    // --- PILLAR I: FOUNDATIONS ---
    {
        id: 'what-is-a-cocktail',
        title: 'What Is a Cocktail?',
        pillar: 'Foundations',
        difficulty: 'Beginner',
        tags: ['Structure', 'History'],
        description: 'Discover the original 1806 definition of the cocktail and the golden ratio of balance.',
        content: [
            'The word "cocktail" gets thrown around a lot today to describe anything mixed in a glass, but historically, it meant something very specific. On May 13, 1806, an upstate New York newspaper editor responded to a reader\'s question by defining a cocktail simply as "a stimulating liquor, composed of spirits of any kind, sugar, water, and bitters."',
            'CALLOUT: If you strip away the neon umbrellas and modern syrups, that 1806 definition remains the absolute bedrock of mixology. A spirit provides the base, sugar provides the needed texture and weight, water (via ice dilution) provides the volume and chilling, and bitters provide the complex seasoning.',
            'To understand this golden ratio in its purest form, there is no better starting point than the Old Fashioned. It is exactly the 1806 definition brought to life: Whiskey (spirit), a sugar cube (sugar), ice (water), and Angostura (bitters). By mastering this simple four-part harmony, you master the foundation of everything that follows.'
        ],
        whyItMatters: [
            'You will understand that "Water" from ice isn\'t just making a drink cold—it\'s a required ingredient.',
            'You will stop thinking of bitters as optional and realize they are the "salt and pepper" of your drink.',
            'You will realize that adding juice or soda technically makes a drink a "Sour" or a "Highball", not a true original Cocktail.'
        ],
        keyTakeaways: [
            'The original 1806 definition required four elements: Spirits, Sugar, Water, and Bitters.',
            'Water dilution from ice is an essential ingredient, not just a chilling mechanism.',
            'The Old Fashioned is the purest physical manifestation of the original cocktail definition.'
        ],
        quiz: [
            { 
                question: 'What are the four required ingredients in the original 1806 cocktail definition?', 
                options: ['Spirit, Citrus, Sugar, Water', 'Spirit, Sugar, Water, Bitters', 'Spirit, Vermouth, Bitters, Ice'], 
                correctAnswerIndex: 1,
                explanation: 'Correct! In 1806, the world had not yet started using citrus (sours) or vermouth (martinis) in drinks. It was simply liquor, sugar, water (ice), and bitters.'
            },
            { 
                question: 'What role does ice play beyond chilling the drink?', 
                options: ['It adds essential water volume', 'It adds sweetness', 'It adds botanical flavors'], 
                correctAnswerIndex: 0,
                explanation: 'Exactly. A properly diluted cocktail is up to 25% water. The melting ice is what marries the harsh alcohol and sweet sugar into a harmonious texture.'
            },
            { 
                question: 'Which drink is the purest example of the original definition?', 
                options: ['Margarita', 'Daiquiri', 'Old Fashioned'], 
                correctAnswerIndex: 2,
                explanation: 'Spot on. The Old Fashioned is literally the 1806 definition in a glass: Whiskey (Spirit), Sugar Cube (Sugar), Angostura (Bitters), and Ice (Water).'
            }
        ],
        featuredCocktailId: 'Old Fashioned',
        tutorContextualPrompts: [
            'Explain the 1806 cocktail definition in simpler terms.',
            'Why does water/ice count as an actual ingredient?',
            'What is the difference between an Old Fashioned and a Sour?'
        ]
    },
    {
        id: 'the-sour-template',
        title: 'The Sour Template',
        pillar: 'Foundations',
        difficulty: 'Beginner',
        tags: ['Structure'],
        description: 'Mastering the delicate trinity of Spirit, Sweet, and Sour.',
        content: [
            'Once bartenders mastered the bitter-and-sugar balance of the Old Fashioned, they began experimenting with introducing acid. Enter the Sour, arguably the single most important and frequently replicated template in cocktail history. Once you understand the mechanics of a Sour, you instantly know how to make variations.',
            'The classic "Sour" relies on a delicate trinity: a base spirit (for the foundation), a sour citrus component (usually lemon or lime for brightness), and a sweet component (usually simple syrup or a liqueur) to round off the sharp acidic edges.',
            'CALLOUT: The magic lies in the tension between the sweet and the sour. The canonical formula is typically 2 ounces of Spirit, 1 ounce of Sour, and ¾ ounce of Sweet (the 2:1:¾ ratio).',
            'To taste this perfect tension, look no further than a classic Daiquiri—a flawless trinity of Rum, Lime, and Sugar.'
        ],
        whyItMatters: [
            'You will understand why your drinks taste "too sharp" (needs sweet) or "too flat" (needs sour).',
            'You can instantly invent your own drinks by swapping the base spirit (e.g. swap Rum for Tequila to make a Margarita).',
            'You will realize that a "Sour Mix" bottle is just a terrible artificial replacement for fresh lime and sugar.'
        ],
        keyTakeaways: [
            'The Sour template relies on balancing a base spirit with a sour element and a sweet element.',
            'The most common golden ratio for a modern sour is 2:1:¾ (Spirit:Sour:Sweet).',
            'The classic Daiquiri is the ultimate blank canvas to test your citrus balance.'
        ],
        quiz: [
            { question: 'What is the "Trinity" of the Sour Template?', options: ['Spirit, Sweet, Sour', 'Spirit, Bitter, Sweet', 'Spirit, Soda, Sour'], correctAnswerIndex: 0, explanation: 'Correct. A sour requires a Spirit base, a Sweet modifier, and a Sour citrus to balance each other out.' },
            { question: 'What is the canonical ratio for a modern sour?', options: ['1:1:1', '2:1:¾', '3:2:1'], correctAnswerIndex: 1, explanation: 'Nailed it. 2oz Spirit, 1oz Sour, and 0.75oz Sweet represents the modern golden ratio for hundreds of classic cocktails.' },
            { question: 'If a Sour tastes too sharp or astringent, what is it missing?', options: ['More Spirit', 'More Sweetness', 'More Acid'], correctAnswerIndex: 1, explanation: 'Exactly. Sweetness directly counteracts acidity. If a drink is too sour, it simply needs more sugar to pull the tension back into balance.' }
        ],
        featuredCocktailId: 'Daiquiri',
        tutorContextualPrompts: [
            'Explain the 2:1:0.75 ratio logic.',
            'How do I save a drink that is too sour?',
            'What is the difference between Lemon and Lime in a sour?'
        ]
    },
    {
        id: 'ratio-thinking',
        title: 'Ratio Thinking',
        pillar: 'Foundations',
        difficulty: 'Intermediate',
        tags: ['Structure', 'Math'],
        description: 'How to build your own drink without guessing by using the 2:1:1 logic.',
        content: [
            'While the 2:1:¾ ratio is perfect for simple syrups, the cocktail world often relies on a slightly bolder formula when using liqueurs as the sweetener: the 2:1:1 ratio. This means 2 parts strong (Spirit), 1 part sour (Citrus), and 1 part sweet (Liqueur).',
            'Liqueurs (like Cointreau or Amaretto) are less aggressively sweet than pure simple syrup but bring significantly more flavor and volume to the table. By bumping the sweet ratio up to a full ounce, you allow the complex orange or almond notes to shine without overpowering the base spirit.',
            'The Sidecar is the ultimate professor of the 2:1:1 ratio. By combining 2 ounces of Cognac, 1 ounce of Lemon, and 1 ounce of Orange Liqueur (Cointreau), you achieve a perfectly balanced, slightly drier tartness that a standard syrup sour simply cannot replicate.'
        ],
        whyItMatters: [
            'You will stop memorizing arbitrary measurements and start building drinks intuitively via ratios.',
            'You will know exactly how much liqueur to substitute if you run out of simple syrup.',
            'You can confidently invent a new cocktail on the fly by plugging ingredients into the 2:1:1 slots.'
        ],
        keyTakeaways: [
            'The 2:1:1 ratio is ideal when using flavored liqueurs instead of plain simple syrup.',
            'Liqueurs add flavor volume and are generally less sweet than pure syrup, requiring a slightly higher pour.',
            'The Sidecar is the canonical example of 2:1:1 balance.'
        ],
        quiz: [
            { question: 'When is the 2:1:1 ratio preferred over the 2:1:¾ ratio?', options: ['When you want a stronger drink', 'When using a flavored liqueur as the sweetener instead of simple syrup', 'When using limes instead of lemons'], correctAnswerIndex: 1 },
            { question: 'What does the "2" stand for in the 2:1:1 ratio?', options: ['2 ounces of Liqueur', '2 parts Strong (Base Spirit)', '2 dashes of Bitters'], correctAnswerIndex: 1 },
            { question: 'Which cocktail perfectly demonstrates the 2:1:1 ratio?', options: ['Old Fashioned', 'Mojito', 'Sidecar'], correctAnswerIndex: 2 }
        ],
        featuredCocktailId: 'Sidecar'
    },
    {
        id: 'the-sweetener-spectrum',
        title: 'The Sweetener Spectrum',
        pillar: 'Foundations',
        difficulty: 'Beginner',
        tags: ['Structure', 'Flavor'],
        description: 'Simple syrup vs honey vs demerara vs liqueur sweetness.',
        content: [
            'Not all sugar is created equal. The sweetener you choose doesn\'t just adjust the tartness of a drink; it fundamentally alters the weight, texture, and flavor profile. Using plain white sugar creates a "Simple Syrup" that provides clean sweetness without altering the flavor of the spirit.',
            'If you use raw brown sugar (Demerara or Turbinado), you introduce deep caramel, molasses, and toffee notes that pair brilliantly with dark rums and whiskeys. Honey syrup adds an earthy, floral thickness, while Agave nectar brings a grassy, vegetal sweetness perfect for Tequila.',
            'The Gold Rush perfectly illustrates how swapping a sweetener changes the entire identity of a drink. By simply taking a standard Whiskey Sour and swapping the simple syrup for Rich Honey Syrup, the drink transforms from bright and sharp to incredibly grounded, earthy, and soothing.'
        ],
        whyItMatters: [
            'You will never use white sugar in a dark rum or whiskey drink again.',
            'You will understand that honey and agave must be diluted with water to mix properly in cold drinks.',
            'You will start choosing sweeteners not just for sugar content, but for flavor pairing.'
        ],
        keyTakeaways: [
            'Simple Syrup (white sugar) is neutral and flavorless; it sweetens without changing the profile.',
            'Demerara syrup adds rich caramel and molasses notes ideal for dark, aged spirits.',
            'Honey and Agave provide incredibly distinct, earthy flavors that dramatically alter the identity of a sour.'
        ],
        quiz: [
            { question: 'Why would a bartender choose Demerara sugar over white sugar?', options: ['It dissolves faster in cold water', 'It provides rich caramel and molasses notes that pair with dark spirits', 'It is less caloric'], correctAnswerIndex: 1 },
            { question: 'What happens to pure honey if you try to shake it in a cold cocktail without turning it into a syrup first?', options: ['It foams up aggressively', 'It seizes and hardens into an unmixable glob', 'It ferments instantly'], correctAnswerIndex: 1 },
            { question: 'Which cocktail is essentially a Whiskey Sour sweetened with Honey Syrup?', options: ['Old Fashioned', 'Gold Rush', 'Manhattan'], correctAnswerIndex: 1 }
        ],
        featuredCocktailId: 'Gold Rush'
    },
    {
        id: 'bitters-the-spice-rack',
        title: 'Bitters: The Spice Rack',
        pillar: 'Foundations',
        difficulty: 'Intermediate',
        tags: ['Structure', 'Flavor'],
        description: 'Understanding Angostura, Orange, and Peychaud\'s.',
        content: [
            'If base spirits are the meat of a cocktail and citrus is the acid, then bitters are the spice rack. Bitters are high-proof alcohols that have been aggressively infused with roots, barks, spices, and botanicals. They are so concentrated that they are dispensed in dashes, not ounces.',
            'Angostura is the absolute king of the category, recognizable by its oversized paper label. It tastes of heavy baking spices—clove, cinnamon, and allspice. Orange bitters are exactly what they sound like, providing a bright, zesty citrus oil finish. Peychaud\'s bitters, originating in New Orleans, are bright red and deliver lighter, floral notes of anise and cherry.',
            'The Sazerac is the ultimate showcase for Peychaud\'s bitters. The bright red dashes contrast against the sharp Rye whiskey, providing the drink\'s signature ruby hue and its unmistakable licorice and floral aroma.'
        ],
        whyItMatters: [
            'You will understand why 2 tiny dashes of liquid radically changes a 3oz drink.',
            'You will know to reach for Orange bitters for bright refreshing drinks, and Angostura for heavy, brooding drinks.',
            'You will stop skipping bitters when making an Old Fashioned.'
        ],
        keyTakeaways: [
            'Bitters act as the "salt and pepper" of mixology, binding disparate ingredients together.',
            'Angostura provides heavy, dark baking spices (clove, cinnamon).',
            'Peychaud\'s bitters provide lighter, floral notes of anise and cherry and are essential for New Orleans classics.'
        ],
        quiz: [
            { question: 'How are bitters typically measured in a cocktail recipe?', options: ['In Ounces', 'In Dashes', 'In Teaspoons'], correctAnswerIndex: 1 },
            { question: 'Which bitters brand is famous for its oversized, poorly-fitting paper label and heavy baking spice flavor?', options: ['Peychaud\'s', 'Fee Brothers', 'Angostura'], correctAnswerIndex: 2 },
            { question: 'Which classic New Orleans cocktail relies heavily on bright red Peychaud\'s bitters?', options: ['Margarita', 'Sazerac', 'Negroni'], correctAnswerIndex: 1 }
        ],
        featuredCocktailId: 'Sazerac'
    },
    {
        id: 'stirred-vs-shaken',
        title: 'Stirred vs Shaken',
        pillar: 'Foundations',
        difficulty: 'Beginner',
        tags: ['Technique', 'Structure'],
        description: 'Learn the golden rule of cocktail aeration and dilution.',
        content: [
            'One of the most common questions beginners ask is, "How do I know whether to stir or shake a drink?" Thanks to James Bond, pop culture has wildly skewed our understanding of this fundamental rule, leading to millions of cloudy, over-diluted martinis.',
            'The rule is surprisingly simple: If a cocktail contains only clear spirits, liqueurs, and wines (like vermouth), you stir it. Stirring gently chills and dilutes the drink while maintaining a silky, heavy, and crystal-clear texture. If a cocktail contains opaque ingredients like fruit juice, dairy, egg whites, or cream, you violently shake it. Shaking forcefully aerates the liquid, integrating stubborn textures and creating a bright, frothy mouthfeel.',
            'The Manhattan is the ultimate lesson in the stirring technique. Consisting of Whiskey, Sweet Vermouth, and Bitters—all clear, robust liquids—it demands the slow, gentle chill of a mixing glass to preserve its velvet weight.'
        ],
        whyItMatters: [
            'You will instantly know if a recipe is telling you the wrong technique.',
            'You will stop ruining the texture of your Martinis and Manhattans by shaking them.',
            'You will understand that shaking isn\'t just about getting cold—it\'s about forcing aeration (bubbles) into juice.'
        ],
        keyTakeaways: [
            'Rule of thumb: Stir drinks made entirely of clear spirits and wines; shake drinks containing juices or dairy.',
            'Stirring maintains a heavy, silky texture and a crystal-clear appearance.',
            'Shaking violently aerates the liquid, producing a lighter, frothy body.'
        ],
        quiz: [
            { question: 'According to the golden rule, which of the following drinks MUST be shaken?', options: ['A drink containing Whiskey, Sweet Vermouth, and Bitters', 'A drink containing Gin, Lemon Juice, and Simple Syrup', 'A drink containing Vodka and Dry Vermouth'], correctAnswerIndex: 1 },
            { question: 'What does stirring achieve that shaking destroys?', options: ['Aeration and froth', 'A silky, heavy texture and crystal-clear appearance', 'A faster chill time'], correctAnswerIndex: 1 },
            { question: 'Was James Bond correct to order his Vodka Martini "shaken, not stirred"?', options: ['Yes, vodka requires aeration', 'No, shaking a drink made entirely of clear spirits results in a cloudy, over-diluted mess'], correctAnswerIndex: 1 }
        ],
        featuredCocktailId: 'Manhattan'
    },
    {
        id: 'equal-parts-balance',
        title: 'Equal Parts Balance',
        pillar: 'Foundations',
        difficulty: 'Advanced',
        tags: ['Structure', 'Math'],
        description: 'Exploring the magic of perfectly symmetrical cocktail recipes.',
        content: [
            'While many cocktails rely on a dominant base spirit supported by smaller accent ingredients, there is a mesmerizing category of drinks built entirely on symmetry: the equal-parts cocktail. In these recipes, no single ingredient is allowed to take center stage.',
            'Instead of a lead singer and a backup band, an equal-parts cocktail acts like a choral arrangement. Ingredients that seem completely overpowering on their own (like intensely bitter Campari or herbaceous Chartreuse) are forced into a delicate standoff when matched seamlessly 1-to-1 against heavy spirits and sweet vermouths.',
            'The Negroni is the undisputed king of equal-parts symmetry. By matching bold Gin, bitter Campari, and rich Sweet Vermouth at exactly one ounce each, the ingredients lock together, creating a flavor profile that is entirely unique from its sum parts.'
        ],
        whyItMatters: [
            'You will learn how to tame overwhelmingly aggressive ingredients (like Campari) by forcing them into a standoff.',
            'You will have an incredibly easy template to memorize (1oz of everything).',
            'You will understand why bartenders revere symmetry as the highest form of mathematical mixology.'
        ],
        keyTakeaways: [
            'Equal-parts cocktails use symmetrical measurements (e.g., 1oz : 1oz : 1oz).',
            'Symmetry forces aggressive, overpowering ingredients to balance and tame one another.',
            'The Negroni is the most famous equal-parts template in mixology.'
        ],
        quiz: [
            { question: 'What defines an "equal-parts" cocktail?', options: ['Every ingredient uses the exact same volume measurement', 'It has equal amounts of alcohol and non-alcohol', 'It is served in two separate glasses'], correctAnswerIndex: 0 },
            { question: 'What happens when you put aggressive ingredients like Campari into an equal-parts template?', options: ['They overpower the entire drink', 'They are forced into a delicate standoff and balanced by the other equal ingredients', 'They lose all their flavor'], correctAnswerIndex: 1 },
            { question: 'What are the three equal ingredients in a classic Negroni?', options: ['Whiskey, Sweet Vermouth, Bitters', 'Gin, Lemon Juice, Simple Syrup', 'Gin, Campari, Sweet Vermouth'], correctAnswerIndex: 2 }
        ],
        featuredCocktailId: 'Negroni'
    },
    {
        id: 'breaking-the-rules',
        title: 'Breaking the Rules: When Ratios Don\'t Apply',
        pillar: 'Foundations',
        difficulty: 'Advanced',
        tags: ['Structure', 'Theory'],
        description: 'Exploring why some legendary cocktails deliberately shatter the golden math rules.',
        content: [
            'We spend years learning the sacred ratios—the 2:1:¾ of the Sour, the equal-parts symmetry of the Negroni, the delicate 2:1 of a Manhattan. But eventually, you encounter drinks that look completely unhinged on paper, yet taste like absolute genius in the glass.',
            'These "rule-breaking" cocktails often manipulate texture, intense dilution, or extremely aggressive modifiers to force balance where math says there shouldn\'t be any. For example, a drink might use an entire ounce of intensely bitter Campari against just a half-ounce of base spirit, compensating by vigorously shaking it to aerate the bitterness into submission.',
            'The Jungle Bird is a masterclass in breaking the rules. It uses an incredibly aggressive 1.5 ounces of dark rum, 1.5 ounces of pineapple juice, and nearly an entire ounce of notoriously bitter Campari. The ratio is chaotic, but the thick, frothy texture of shaken pineapple juice violently subdues the Campari, creating harmony out of mathematical chaos.'
        ],
        whyItMatters: [
            'You will understand that math ratios are starting points, not absolute laws.',
            'You will realize that texture (like pineapple froth or egg white) can actively counteract extreme bitterness.',
            'You will feel confident tweaking recipes to fit your own palate without worrying about "ruining" the golden ratio.'
        ],
        keyTakeaways: [
            'Some flawless cocktails use ratios that completely defy traditional balance structures.',
            'Bartenders use aeration and texture (like dense foam) to tame ingredients that are mathematically overpowering.',
            'The Jungle Bird is a perfect example of chaotic measurements working perfectly together due to pineapple froth.'
        ],
        quiz: [
            { question: 'Why do rule-breaking cocktails often still taste perfectly balanced despite aggressive, seemingly wrong measurements?', options: ['They rely on artificial sweeteners to mask the mistakes', 'They utilize intense texture, aeration, or dilution to physically tame the aggressive ingredients', 'They actually do taste bad, people just pretend to like them'], correctAnswerIndex: 1 },
            { question: 'What specific ingredient in the Jungle Bird provides a huge amount of aerated froth to subdue the heavy Campari?', options: ['Egg White', 'Pineapple Juice', 'Club Soda'], correctAnswerIndex: 1 },
            { question: 'What is the ultimate lesson of advanced cocktail architecture?', options: ['Never stray from the 2:1:¾ ratio', 'Math is a foundational guideline, not an absolute law—flavor and texture rule supreme', 'Always use equal parts when in doubt'], correctAnswerIndex: 1 }
        ],
        featuredCocktailId: 'Jungle Bird'
    },

    // --- PILLAR II: SPIRIT JOURNEYS ---
    {
        id: 'whiskey-journey',
        title: 'Whiskey Journey',
        pillar: 'Spirit Journeys',
        difficulty: 'Beginner',
        tags: ['Spirit'],
        description: 'From sweet corn Bourbon to spicy Rye and smoky Scotch.',
        content: [
            'Whiskey is an incredible, sprawling family tree of brown spirits, all connected by their distillation from fermented grain mash and their required aging in wooden barrels. But depending on the grain and the barrel, the results are wildly different.',
            'Bourbon, an American invention, must consist of at least 51% corn, resulting in a naturally sweet, rich, caramel-heavy profile. Rye whiskey, its rebellious sibling, uses a minimum of 51% rye grain, resulting in a drier, sharper, distinctly peppery bite. Scotch, hailing from Scotland, relies on malted barley, occasionally dried over peat fires to impart an incredibly deep, smoky profile.',
            'To truly taste the difference a specific whiskey makes, try a Whiskey Sour. A Bourbon sour will be luscious and sweet, while a Rye sour will snap with a sharp, spicy attitude.'
        ],
        whyItMatters: [
            'You will stop ordering "Whiskey" blindly and start specifying the exact style you want.',
            'You will know that Bourbon makes drinks sweeter, while Rye makes them spicier.',
            'You will understand how to warn a friend before they accidentally order a heavily peated, smoky Scotch.'
        ],
        knowBeforeYouOrder: [
            'BOURBON: Expect sweet corn, vanilla, and heavy caramel.',
            'RYE: Expect a drier, sharper, distinctly peppery and aggressive bite.',
            'SCOTCH: Expect earthy malt. If it says "Islay", expect intense campfire smoke and iodine.'
        ],
        keyTakeaways: [
            'Bourbon is made mostly from corn and offers sweet, caramel, and vanilla notes.',
            'Rye is made mostly from rye grain and provides a sharp, spicy, and peppery bite.',
            'Scotch is made from malted barley and can frequently feature deep, earthy smoke from peat.'
        ],
        quiz: [
            { question: 'By law, Bourbon must be made from at least 51% of what grain?', options: ['Barley', 'Rye', 'Corn'], correctAnswerIndex: 2 },
            { question: 'Which style of whiskey is known for its sharp, spicy, and peppery bite?', options: ['Bourbon', 'Rye', 'Irish Whiskey'], correctAnswerIndex: 1 },
            { question: 'If a Scotch is described as "Peaty", what flavor should you expect?', options: ['Intense sweetness', 'Deep, earthy campfire smoke', 'Bright floral notes'], correctAnswerIndex: 1 }
        ],
        featuredCocktailId: 'Whiskey Sour'
    },
    {
        id: 'gin-journey',
        title: 'Gin Journey',
        pillar: 'Spirit Journeys',
        difficulty: 'Intermediate',
        tags: ['Spirit', 'History'],
        description: 'Exploring the botanical backbone of classic mixology.',
        content: [
            'Before vodka hijacked the 1980s, Gin was the undisputed king of clear spirits. But what actually is gin? In its simplest definition, Gin is essentially just vodka that has been heavily infused with juniper berries and a complex array of other savory botanicals.',
            'London Dry Gin is the industry standard—a ruthlessly crisp, pine-heavy spirit with zero added sugar. "Old Tom" Gin is a fascinating historic relic, lightly sweetened to mask harsh distillation in the 1800s. Modern "New Western" gins minimize the strong juniper bite, favoring bizarre, avant-garde infusions like cucumber, rose, or seaweed.',
            'The classic Gimlet is the purest botanical playground. Shaking gin violently with nothing more than lime juice and simple syrup provides an untampered canvas to taste the subtle floral notes of the spirit.'
        ],
        whyItMatters: [
            'You will be able to explain to vodka drinkers that Gin is just flavored vodka with a history degree.',
            'You will understand why some gins taste like pine trees and others taste like cucumber water.',
            'You will know to reach for London Dry when you want a crisp, classic Martini.'
        ],
        knowBeforeYouOrder: [
            'LONDON DRY: The classic standard. Expect aggressive pine (juniper) and dry citrus.',
            'OLD TOM: A historical slightly sweeter, rounder style for 1800s recipes like the Martinez.',
            'NEW WESTERN: Modern, avant-garde gins that dial back the juniper in favor of cucumber, rose, or citrus.'
        ],
        keyTakeaways: [
            'Gin is fundamentally a neutral spirit aggressively infused with juniper and botanicals.',
            'London Dry is the most common style, featuring a crisp, pine-forward, sugar-free profile.',
            'The Gimlet provides a clean, acidic canvas to taste the subtle botanicals in different gin brands.'
        ],
        quiz: [
            { question: 'What specific botanical berry is legally required to be the dominant flavor in Gin?', options: ['Coriander', 'Juniper', 'Angelica Root'], correctAnswerIndex: 1 },
            { question: 'Which style of Gin is defined by being ruthlessly crisp and containing zero added sugar?', options: ['New Western', 'Old Tom', 'London Dry'], correctAnswerIndex: 2 },
            { question: 'If a Gin is famous for tasting like cucumber and rose petals instead of pine, it likely belongs to which category?', options: ['London Dry', 'New Western', 'Bathtub Gin'], correctAnswerIndex: 1 }
        ],
        featuredCocktailId: 'Gimlet'
    },
    {
        id: 'rum-journey',
        title: 'Rum Journey',
        pillar: 'Spirit Journeys',
        difficulty: 'Advanced',
        tags: ['Spirit'],
        description: 'Jamaican funk vs Cuban crispness and Agricole grassiness.',
        content: [
            'Of all the base spirits, Rum is the most wonderfully chaotic. Because it is distilled across dozens of wildly different Caribbean islands with incredibly loose regulations, the flavor profiles range from clean and crisp to aggressively funky and dark.',
            'Spanish-style rums (from Puerto Rico or Cuba) are column-distilled and charcoal-filtered, creating a crisp, highly mixable light rum perfect for Mojitos. Jamaican rums, however, embrace high ester pot-distillation, resulting in a wild, over-ripe banana flavor known affectionately as "hogo" or funk. French Rhum Agricole entirely ignores molasses, fermenting fresh-pressed sugar cane juice resulting in an intensely grassy, earthy profile.',
            'The Jungle Bird acts as a massive magnifying glass for dark rum. The rich molasses and slight funk of a black strap rum are required to stand up against the overpowering bitter bite of Campari.'
        ],
        whyItMatters: [
            'You will never ruin a delicate Daiquiri by using an overpowering Jamaican rum.',
            'You will understand that "Light" and "Dark" literally only describe the color, not the flavor or the style.',
            'You will be able to read a Tiki recipe calling for "Rhum Agricole" and know exactly why it\'s required.'
        ],
        knowBeforeYouOrder: [
            'SPANISH/CUBAN: Think Bacardi. Crisp, clean, light vanilla. Perfect for delicate Mojitos.',
            'JAMAICAN: Think Smith & Cross. Wild, funky, over-ripe banana (Hogo). Required for Tiki.',
            'AGRICOLE: Think Martinique. Distilled from fresh cane juice, not molasses. Intensely grassy and vegetal.'
        ],
        keyTakeaways: [
            'Rum is distilled entirely from sugarcane byproducts, such as molasses or raw cane juice.',
            'Spanish-style light rums are clean and crisp, while Jamaican rums are famous for their heavy "funk".',
            'Rhum Agricole is unique because it uses fresh sugar cane juice, making it taste grassy and vegetal.'
        ],
        quiz: [
            { question: 'Which island is famous for producing highly pungent, funky, over-ripe esters known as "Hogo"?', options: ['Puerto Rico', 'Cuba', 'Jamaica'], correctAnswerIndex: 2 },
            { question: 'What makes French Rhum Agricole (from Martinique) so drastically different from most other rums?', options: ['It is aged in wine barrels', 'It is distilled from fresh sugar cane juice instead of heavily processed molasses', 'It is spiced with cinnamon'], correctAnswerIndex: 1 },
            { question: 'If you want to make a delicate, crisp Mojito, which style of rum should you reach for?', options: ['Spanish/Cuban Style Light Rum', 'Jamaican Overproof Rum', 'Black Strap Rum'], correctAnswerIndex: 0 }
        ],
        featuredCocktailId: 'Jungle Bird'
    },
    {
        id: 'agave-journey',
        title: 'Agave Journey',
        pillar: 'Spirit Journeys',
        difficulty: 'Intermediate',
        tags: ['Spirit'],
        description: 'Blanco vs Reposado and the deep smoke of wild Mezcal.',
        content: [
            'Tequila and Mezcal occupy a unique space in the spirits world; unlike grains or sugarcane that can be harvested annually, the agave plant takes anywhere from 7 to 30 years to mature before it can be harvested, making every bottle a remarkable labor of time.',
            'Tequila can only be produced in specific regions of Mexico using the Blue Weber Agave, which is traditionally steamed, resulting in a clean, bright, peppery profile. Blanco is unaged, while Reposado rests in oak for months, picking up vanilla and caramel notes. Añejo rests for over a year, drinking almost like a whiskey.',
            'Mezcal, however, can use dozens of wild agave varieties. Critically, these agave hearts are heavily roasted in underground earthen pits before distillation. This wraps the spirit in its legendary blanket of deep, savory smoke. The Paloma beautifully highlights the bright, vegetal notes of a Blanco Tequila, while an Oaxaca Old Fashioned relies on the smoke of Mezcal.'
        ],
        whyItMatters: [
            'You will know exactly how much smoke to expect when you order a "Mezcal Margarita".',
            'You will understand why an Añejo Tequila makes a phenomenal Old Fashioned substitute.',
            'You will appreciate that every drop of agave took at least 7 years to grow.'
        ],
        knowBeforeYouOrder: [
            'BLANCO: Unaged. Bright, sharp, vegetal, and intensely peppery.',
            'REPOSADO / AÑEJO: Rested in oak barrels. Expect vanilla, caramel, and a softer bite.',
            'MEZCAL: Roasted underground. Expect intense, savory, earthy campfire smoke.'
        ],
        keyTakeaways: [
            'All Tequila is technically a Mezcal, but not all Mezcal is Tequila.',
            'Tequila uses steamed Blue Weber agave; Mezcal uses pit-roasted wild agave, generating signature smoke.',
            'Blanco tequila is unaged, while Reposado and Añejo pick up heavy oak and vanilla characteristics.'
        ],
        quiz: [
            { question: 'What is the fundamental production difference that makes Mezcal taste aggressively smoky compared to Tequila?', options: ['Mezcal is aged in charred barrels', 'Mezcal agave hearts are roasted in underground earthen pits with fire', 'Mezcal uses liquid smoke additive'], correctAnswerIndex: 1 },
            { question: 'What does the term "Reposado" mean on a bottle of Tequila?', options: ['It is unaged and bottled immediately', 'It is 100% Blue Weber Agave', 'It has been "rested" in oak barrels for 2 to 12 months'], correctAnswerIndex: 2 },
            { question: 'True or False: Tequila can be made from over 30 different species of wild agave.', options: ['True', 'False (By law, Tequila can ONLY be made from Blue Weber Agave)'], correctAnswerIndex: 1 }
        ],
        featuredCocktailId: 'Paloma'
    },
    {
        id: 'blending-spirits',
        title: 'Blending Spirits: Why Some Drinks Use Two Bases',
        pillar: 'Spirit Journeys',
        difficulty: 'Advanced',
        tags: ['Spirit', 'Structure'],
        description: 'How to build massive complexity by splitting the core base of a cocktail.',
        content: [
            'In nearly every classic recipe, a single spirit acts as the undisputed star of the show. But advanced mixology frequently employs the "Split Base"—the deliberate shattering of the lead ingredient into two perfectly harmonized spirits. Why? Because sometimes you want the weight of whiskey but the sharp apple fruitiness of Applejack.',
            'The Vieux Carré is arguably the most famous split-base classic in existence. Born in New Orleans, this monumental drink requires exactly equal parts of spicy Rye Whiskey and rich, grape-forward Cognac. If you used only Rye, the drink would be too sharp. If you used only Cognac, it would be too flabby and sweet. Together, they create a towering architectural foundation.',
            'Tiki drinks take this to the absolute extreme. A legendary Mai Tai doesn\'t just call for "Rum"; it demands a precise split between a funky, over-ripe Jamaican rum and a dry, wood-heavy aged Martinique rum to simulate a specific lost vintage. Splitting the base is like painting with two distinct, bold colors to invent an entirely new shade.'
        ],
        whyItMatters: [
            'You will understand why some sophisticated cocktails have five ingredients instead of three.',
            'You will be able to salvage a drink that feels "too sharp" by splitting the base with a softer spirit.',
            'You will realize that a "Mai Tai" isn\'t just fruit juice; it requires a highly deliberate rum blend.'
        ],
        keyTakeaways: [
            'A split-base cocktail uses two dominant spirits in equal (or near-equal) measure to build complexity.',
            'The Vieux Carré splits Rye and Cognac to balance sharp spice with rich, fruity weight.',
            'Tiki recipes heavily rely on aggressive rum blends to simulate deep, complex flavor profiles.'
        ],
        quiz: [
            { question: 'What is the primary reason a bartender would use a "Split Base" in a cocktail?', options: ['To save money on expensive spirits', 'To combine the unique characteristics of two different spirits into a single, complex foundation', 'To lower the overall alcohol content'], correctAnswerIndex: 1 },
            { question: 'Which famous New Orleans classic relies heavily on splitting Rye Whiskey and Cognac?', options: ['The Sazerac', 'The Hurricane', 'The Vieux Carré'], correctAnswerIndex: 2 },
            { question: 'True or False: A true classic Mai Tai accomplishes its flavor by splitting multiple styles of rum.', options: ['True, it requires a blend of funky Jamaican and aged rums', 'False, it uses purely vodka and fruit juice'], correctAnswerIndex: 0 }
        ],
        featuredCocktailId: 'Mai Tai'
    },

    // --- PILLAR III: ERA & CULTURE ---
    {
        id: 'the-golden-age',
        title: 'The Golden Age',
        pillar: 'Era & Culture',
        difficulty: 'Beginner',
        tags: ['History'],
        description: 'The late 1800s and the birth of the vermouth modification.',
        content: [
            'Before 1870, if you ordered a cocktail, it was almost always a heavy, room-temperature slurry of spirit, sugar, water, and bitters. But the Golden Age of Cocktails arrived with a massive technological leap: the global distribution of commercial ice and the widespread importation of European Vermouths.',
            'Suddenly, bartenders in New York and London weren\'t just making strong drinks; they were modifying them with delicate, herbaceous fortified wines. This was the era that birthed the Martinez, the Manhattan, and eventually the Martini. The heavy, sweet liqueurs were swapped for elegant, nuanced dry and sweet vermouths refrigerated over immaculate ice.',
            'The Martinez is the literal missing link of cocktail evolution. It bridges the gap between the heavy Dutch Genever (an early gin) and the crisp, ruthless perfection of the modern Dry Martini by utilizing Sweet Vermouth and Maraschino liqueur.'
        ],
        whyItMatters: [
            'You will understand the historical timeline of why the Martini exists.',
            'You will realize that a "Martini" without Vermouth is just a sad glass of cold vodka.',
            'You will know to trace the lineage of all stirred spirit-forward drinks back to the 1880s.'
        ],
        keyTakeaways: [
            'The widespread availability of commercial ice and European Vermouths birthed the Golden Age.',
            'Bartenders stopped relying on heavy sugars and started using herbaceous fortified wines to balance spirits.',
            'The Martinez is the historical ancestor that eventually evolved into the Martini.'
        ],
        quiz: [
            { question: 'What crucial imported ingredient defined the cocktails of the Golden Age (1870s-1890s)?', options: ['Lime Juice', 'European Vermouth', 'Simple Syrup'], correctAnswerIndex: 1 },
            { question: 'Which cocktail is widely considered the historical missing link between old Genever drinks and the modern Dry Martini?', options: ['The Martinez', 'The Sidecar', 'The Old Fashioned'], correctAnswerIndex: 0 },
            { question: 'Beyond Vermouth, what massive technological shift allowed the Golden Age of mixology to thrive?', options: ['The invention of the blender', 'The widespread commercial distribution of Ice', 'The repeal of Prohibition'], correctAnswerIndex: 1 }
        ],
        featuredCocktailId: 'Martinez'
    },
    {
        id: 'prohibition-and-speakeasies',
        title: 'Prohibition & Speakeasies',
        pillar: 'Era & Culture',
        difficulty: 'Intermediate',
        tags: ['History'],
        description: 'How the 18th Amendment accidentally birthed modern cocktail culture.',
        content: [
            'When the United States outlawed the sale and consumption of alcohol in 1920, the government assumed the nation would sober up. Instead, they accidentally ignited one of the most explosive eras of cocktail innovation in history.',
            'Because "bathtub gin" and smuggled run-runner spirits were genuinely awful and frequently dangerous to drink straight, bartenders working in secret underground speakeasies were forced to mask the terrible flavors with aggressive citrus, heavy syrups, and complex liqueurs. Necessity became the mother of invention.',
            'The Bee\'s Knees is the definitive Prohibition survivor. To hide the terrible taste and smell of illegal bathtub gin, bartenders effectively drowned the spirit in a heavy, pungent honey syrup and sharp lemon juice.'
        ],
        whyItMatters: [
            'You will understand why 1920s drinks are almost exclusively sour and highly sweetened.',
            'You will see how political laws literally dictated the flavor profiles of an entire generation.',
            'You will appreciate the ingenuity required to make bathtub alcohol palatable.'
        ],
        keyTakeaways: [
            'Prohibition outlawed alcohol, forcing drinking underground into hidden speakeasies.',
            'Because illegal spirits tasted terrible, bartenders were forced to invent complex sour recipes to mask the flavor.',
            'Heavy sweeteners like honey and aggressive citrus became staple ingredients of the 1920s.'
        ],
        quiz: [
            { question: 'Why did Prohibition-era cocktails rely so heavily on aggressive citrus and heavy syrups like honey?', options: ['Because the clientele preferred sweet drinks', 'To mask the horrific smell and taste of poorly distilled illegal bathtub gin', 'Because sugar was extremely cheap'], correctAnswerIndex: 1 },
            { question: 'Which famous Prohibition cocktail used honey and lemon to drown out the taste of terrible gin?', options: ['The Manhattan', 'The Bee\'s Knees', 'The Aviation'], correctAnswerIndex: 1 },
            { question: 'What is the term for the illegal underground bars operating during Prohibition?', options: ['Tiki Bars', 'Saloons', 'Speakeasies'], correctAnswerIndex: 2 }
        ],
        featuredCocktailId: 'Bee\'s Knees'
    },
    {
        id: 'the-tiki-boom',
        title: 'The Tiki Boom',
        pillar: 'Era & Culture',
        difficulty: 'Intermediate',
        tags: ['History', 'Culture'],
        description: 'The post-war rise of tropical escapism and rum complexity.',
        content: [
            'Following World War II, returning American soldiers brought back a deep romanticism for the South Pacific. Savvy restaurateurs like Don the Beachcomber and Trader Vic capitalized on this by inventing "Tiki"—a wildly successful, entirely fabricated aesthetic of tropical escapism.',
            'While the decor was delightfully artificial, the drinks were mixological masterpieces. Tiki drinks moved away from simple 3-ingredient classics and introduced highly guarded, multi-layered recipes requiring split-bases of three different rums, exotic spice syrups like Falernum or Cinnamon, and extravagant flaming garnishes.',
            'Trader Vic\'s Mai Tai is the holy grail of the Tiki era. It masterfully blends two different styles of aged rum with the nutty, almond sweetness of Orgeat syrup into a wildly complex tropical sour.'
        ],
        whyItMatters: [
            'You will understand why Tiki drinks require 8 weird ingredients instead of the usual 3.',
            'You will know that Tiki culture was a completely American invention, not authentic Polynesian history.',
            'You will respect the genius of blending multiple rums into a single glass to build depth.'
        ],
        keyTakeaways: [
            'Tiki was a post-WWII American phenomenon combining South Pacific decor with elaborate rum drinks.',
            'Tiki recipes heavily utilized split-base rums, blending multiple varieties into a single drink.',
            'The Mai Tai, invented by Trader Vic, became so globally popular that it reportedly depleted global rum reserves.'
        ],
        quiz: [
            { question: 'What defining technique did Tiki pioneers like Don the Beachcomber use to build incredible depth in their drinks?', options: ['Using only vodka', 'Blending multiple different styles of rum together (Split-base)', 'Never using ice'], correctAnswerIndex: 1 },
            { question: 'Which legendary almond-flavored syrup is the absolute backbone of the iconic Mai Tai?', options: ['Orgeat', 'Grenadine', 'Falernum'], correctAnswerIndex: 0 },
            { question: 'True or False: Tiki culture reflects authentic, historical Polynesian mixology practices.', options: ['True', 'False (It was an entirely fabricated aesthetic created by American restaurateurs)'], correctAnswerIndex: 1 }
        ],
        featuredCocktailId: 'Mai Tai'
    },
    {
        id: 'rise-of-the-modern-classic',
        title: 'Rise of the Modern Classic',
        pillar: 'Era & Culture',
        difficulty: 'Intermediate',
        tags: ['History', 'Culture'],
        description: 'The 2000s craft revival and the birth of the Paper Plane and Naked & Famous.',
        content: [
            'By the early 2000s, legendary bartenders like Sasha Petraske running underground bars in New York City decided enough was enough. They rejected the sour mixes, neon syrups, and artificial flavors of the 80s Club Era, sparking the global Craft Cocktail Renaissance taking over the world today.',
            'The Craft Revival is defined by two principles: a fanatical return to fresh-squeezed juices and historical accuracy, and a massive revitalization of intensely bitter Italian liqueurs (Amari) and herbal modifiers (like Chartreuse).',
            'Because these modern bartenders understood the equal-parts mechanical math of the 1920s, they began plugging these resurrected Italian Amari into old templates. Sam Ross invented the Paper Plane in 2008 by plugging Bourbon, Aperol, and Amaro Nonino into the equal-parts Last Word template, proving that modern bartenders can still invent absolute legends.'
        ],
        whyItMatters: [
            'You will recognize why menus suddenly exploded with weird Italian liqueurs you can\'t pronounce.',
            'You will understand that "Modern Classics" are usually just brilliant math swaps of incredibly old templates.',
            'You will know how to order the most famous drinks invented in the 21st century.'
        ],
        keyTakeaways: [
            'The Craft Cocktail Renaissance rejected the artificial sour mixes of the late 20th century.',
            'The era heavily popularized bitter and herbal Italian liqueurs (Amari) that had been forgotten for decades.',
            'The Paper Plane is a definitive "Modern Classic," invented in 2008 using equal portions of Bourbon, Aperol, Amaro Nonino, and Lemon.'
        ],
        quiz: [
            { question: 'The Craft Cocktail Revival of the 2000s saw a massive explosion in the popularity of what specific type of modifier?', options: ['Neon sour mix', 'Bitter Italian Amari and herbal liqueurs', 'Vodka infusions'], correctAnswerIndex: 1 },
            { question: 'When Sam Ross invented the famous Paper Plane in 2008, what classic Golden Age math template did he use?', options: ['The 2:1:¾ Sour Ratio', 'The Equal-Parts Ratio (1oz of everything)', 'The Highball Ratio'], correctAnswerIndex: 1 },
            { question: 'Which of the following is considered a definitive "Modern Classic" born in the 21st century?', options: ['Aviation', 'Margarita', 'Paper Plane'], correctAnswerIndex: 2 }
        ],
        featuredCocktailId: 'Paper Plane'
    },
    {
        id: 'death-and-rebirth-of-vermouth',
        title: 'The Death & Rebirth of Vermouth',
        pillar: 'Era & Culture',
        difficulty: 'Advanced',
        tags: ['History', 'Theory'],
        description: 'How a ruined ingredient almost killed the Martini, and how craft bars brought it back.',
        content: [
            'If you watched a movie in the 1990s, the joke was always that a Martini should contain "as little vermouth as possible", perhaps just waving the bottle over the glass. This entire cultural meme actually derived from a massive logistical failure. Vermouth is wine. Like all wine, the moment it is opened and exposed to oxygen, it begins to spoil and turn into bitter vinegar.',
            'During the dark ages of the 1980s and 90s, dive bars routinely left half-empty bottles of vermouth sitting proudly on a hot, sunny back bar for months on end. When that rancid, oxidized wine was poured into a martini, it tasted horrific so consumers demanded its removal. The "Extra Dry" martini was born out of terrible refrigeration, not sophisticated taste.',
            'The Craft Cocktail Revival fixed this by simply putting vermouth back into the refrigerator. A perfectly fresh, un-oxidized Sweet Vermouth allows the Manhattan to soar. A fresh Dry Vermouth makes the classic 50/50 Martini an absolute revelation of deeply herbaceous, floral tension, proving the ingredient was never broken—just badly treated.'
        ],
        whyItMatters: [
            'You will instantly start putting your personal bottles of Vermouth in the refrigerator.',
            'You will understand why your parents think they hate Vermouth.',
            'You will realize that a true Martini is actually meant to taste like delicate herbs, not just cold high-proof ethanol.'
        ],
        keyTakeaways: [
            'Vermouth is a fortified wine, meaning it absolutely will spoil and oxidize rapidly if not actively refrigerated.',
            'The trend of ordering "extra dry" martinis was a trauma response to bars using rancid, warm vermouth for decades.',
            'Fresh vermouth is sweet, herbaceous, and entirely necessary to properly construct a Manhattan or a Martini.'
        ],
        quiz: [
            { question: 'What is the absolute golden rule for storing Vermouth once the bottle is opened?', options: ['Keep it in the freezer', 'It MUST be refrigerated to drastically slow down oxidation and spoilage', 'Keep it next to the whiskey on the shelf'], correctAnswerIndex: 1 },
            { question: 'Why did popular culture in the 90s push the joke that a Martini should contain almost zero vermouth?', options: ['Because vodka became too expensive', 'Because most bars were literally serving rancid, oxidized vermouth that tasted like terrible vinegar', 'Because James Bond said so'], correctAnswerIndex: 1 },
            { question: 'True or False: A fresh bottle of Dry Vermouth is supposed to taste intensely bitter and harsh.', options: ['True', 'False; fresh vermouth is actually wildly delicate, herbaceous, and delightfully complex'], correctAnswerIndex: 1 }
        ],
        featuredCocktailId: 'Martinez'
    },


    // --- PILLAR IV: TECHNIQUE SCHOOL ---
    {
        id: 'ice-and-dilution',
        title: 'Ice & Dilution',
        pillar: 'Technique School',
        difficulty: 'Intermediate',
        tags: ['Technique'],
        description: 'Why ice is actually the most important ingredient in your glass.',
        content: [
            'Beginners treat ice merely as a physical mechanism designed to make a liquid cold. Master mixologists understand that ice is actually a highly controlled, volatile physical ingredient. As you stir or shake a drink, the ice is continuously melting, adding critical water volume to your cocktail.',
            'A properly mixed drink is routinely composed of 15% to 25% water! Without this dilution, the alcohol would tear aggressively at your throat, and the sugar would taste cloyingly thick. The size and density of your ice dictate how fast the drink chills versus how fast it waters down. "Wet" crushed ice dilutes rapidly, while a massive, dense block of "Clear Ice" chills deeply with minimal melt.',
            'The Mint Julep is an extreme masterclass in dilution. Served over a mountain of crushed pebble ice, the high-proof bourbon starts off aggressively hot, but slowly morphs into a mellow, sweet vanilla tea as the ice inevitably melts over thirty minutes.'
        ],
        whyItMatters: [
            'You will stop thinking "Less ice means more alcohol!" (Less ice actually just means a warmer, harsher drink).',
            'You will understand why fancy cocktail bars use massive, perfect cubes of clear ice.',
            'You will realize that a drink tastes bad out of the shaker because it hasn\'t melted enough yet.'
        ],
        keyTakeaways: [
            'Ice is an active ingredient; cocktails require 15-25% water dilution to soften the alcohol burn.',
            'Small, crushed ice chills quickly but dilutes heavily.',
            'Large, dense ice cubes chill deeply but melt slowly, preserving the drink\'s strength over time.'
        ],
        quiz: [
            { question: 'A properly diluted, finished cocktail contains roughly what percentage of water?', options: ['1-5%', '15-25%', '50-60%'], correctAnswerIndex: 1 },
            { question: 'If you want to chill a Negroni in a rocks glass very slowly over 45 minutes WITHOUT it watering down, what ice should you use?', options: ['Crushed Ice', 'Regular freezer cubes', 'One massive, dense block of clear ice'], correctAnswerIndex: 2 },
            { question: 'Why does crushed pebble ice make the Mint Julep work?', options: ['Because it looks pretty', 'Because it melts rapidly, quickly turning the high-proof bourbon into an easy-drinking texture', 'Because it traps the mint leaves'], correctAnswerIndex: 1 }
        ],
        featuredCocktailId: 'Mint Julep'
    },
    {
        id: 'egg-whites-and-foam',
        title: 'Egg Whites & Foam',
        pillar: 'Technique School',
        difficulty: 'Advanced',
        tags: ['Technique'],
        description: 'Unlocking the velvet magic of the "Dry Shake".',
        content: [
            'For centuries, bartenders have used raw egg whites in cocktails, not for flavor, but for structure. When agitated violently, the proteins in an egg white unravel and trap air, acting as a massive textural emulsifier. It transforms a harsh, sharp sour drink into an incredibly silky, velvet cloud.',
            'To properly integrate an egg white, you must utilize the "Dry Shake" technique. First, you add all the ingredients to your shaker without any ice and shake violently for 15 seconds to whip the proteins into a thick meringue. Only then do you add the ice and execute a second "Wet Shake" to chill and dilute.',
            'The Whiskey Sour (when made correctly with an egg white, often termed a Boston Sour) is the definitive foam lesson. The egg white binds the sharp lemon juice and harsh whiskey into a stunningly pillowy, creamy texture.'
        ],
        whyItMatters: [
            'You will understand how to achieve that gorgeous, thick foam collar on top of a drink.',
            'You will know how to soften the harsh acid bite of a sour drink using protein.',
            'You will never attempt to foam an egg white by shaking it directly with ice ever again.'
        ],
        keyTakeaways: [
            'Egg whites add absolutely zero flavor; they are used entirely to build a silky, thick texture.',
            'A "Dry Shake" (shaking without ice first) is required to forcefully whip and emulsify the egg proteins.',
            'The foam provides a stunning visual collar and an aerated, velvet mouthfeel.'
        ],
        quiz: [
            { question: 'What is the primary reason bartenders put raw egg whites in cocktails?', options: ['To add a rich, savory flavor', 'To provide essential vitamins', 'To trap air and build a thick, silky, velvet texture'], correctAnswerIndex: 2 },
            { question: 'What is a "Dry Shake"?', options: ['Shaking the ingredients with dry ice', 'Shaking the ingredients vigorously WITHOUT ANY ICE in the tin first to build the foam', 'Shaking dry vermouth'], correctAnswerIndex: 1 },
            { question: 'If you add an egg white to a Whiskey Sour, what is the drink historically called?', options: ['A New York Sour', 'A Boston Sour', 'A Clover Club'], correctAnswerIndex: 1 }
        ],
        featuredCocktailId: 'Whiskey Sour'
    },
    {
        id: 'glassware-matters',
        title: 'Glassware Matters',
        pillar: 'Technique School',
        difficulty: 'Beginner',
        tags: ['Technique', 'Theory'],
        description: 'Coupe vs Rocks vs Highball vs Nick & Nora.',
        content: [
            'Choosing the correct glass is not just about aesthetics; it is about thermal dynamics and aroma. The structural shape of the glass explicitly dictates how fast the drink gets warm, where the scent hits your nose, and how the ice behaves.',
            'A wide Coupe glass or a V-shaped Martini glass is used for drinks served "Up" (chilled, but with no ice in the glass). By holding the long stem, your hand does not transfer body heat to the liquid. A Rocks glass (Old Fashioned glass) is designed for direct spirit contact on ice, allowing your nose to plunge into the whiskey fumes. A tall Highball glass minimizes surface area to preserve maximum carbonation for sodas and tonics.',
            'The Gimlet is classically served in a chilled Coupe. Without ice to keep it cold in the glass, the stem is required to keep the bright, fragile citrus perfectly chilled while you sip.'
        ],
        whyItMatters: [
            'You will never pour a carbonated drink into a wide, flat Martini glass and wonder why it went flat in 30 seconds.',
            'You will realize that the stem on a glass actually has a functional thermodynamic purpose.',
            'You will know exactly what "Served Up" means when ordering at a bar.'
        ],
        keyTakeaways: [
            'Glassware dictates thermal heat transfer and carbonation preservation.',
            'Stemmed glasses (Martini, Coupe) keep body heat away from fragile drinks served without ice.',
            'Highball glasses minimize surface area to trap carbonation longer.'
        ],
        quiz: [
            { question: 'What is the functional purpose of a long stem on a Martini or Coupe glass?', options: ['It makes the drink easier to carry', 'It prevents the body heat of your hand from warming up the ice-free liquid', 'It holds more volume'], correctAnswerIndex: 1 },
            { question: 'Why is a tall, narrow Highball glass used for drinks like a Mojito or Gin & Tonic?', options: ['It minimizes surface area, which helps trap and preserve the fragile carbonation bubbles', 'It allows you to use less ice', 'It makes the drink taste sweeter'], correctAnswerIndex: 0 },
            { question: 'If you order a drink "Served Up", how will it arrive?', options: ['In a super-sized glass', 'Chilled, but strained into a stemmed glass without any ice', 'With an umbrella'], correctAnswerIndex: 1 }
        ],
        featuredCocktailId: 'Gimlet'
    },
    {
        id: 'garnish-philosophy',
        title: 'Garnish Philosophy',
        pillar: 'Technique School',
        difficulty: 'Intermediate',
        tags: ['Technique', 'Flavor'],
        description: 'Aromatic vs visual vs functional garnish application.',
        content: [
            'A garnish should never exist just to make a drink look pretty. An improper garnish can ruin a drink, while a perfectly executed garnish elevates the entire sensory experience before the liquid even touches your lips.',
            'Garnishes generally fall into three categories. Functional garnishes (like an olive or a cocktail onion) actually bleed savory brines into the liquid as it sits. Visual/Aesthetic garnishes (like Tiki umbrellas or elaborate fruit spears) set the psychological expectation for fun. But the most important are Aromatic garnishes.',
            'When you express (squeeze) a lemon or orange peel over a drink, you spray highly concentrated, bitter aromatic oils across the surface tension of the liquid. Since 80% of flavor is actually smell, a flamed orange peel on a Negroni radically shifts the perception of the drink, coating your nose in bright citrus oil heavily before you even taste the gin.'
        ],
        whyItMatters: [
            'You will understand that squeezing a lemon peel is meant to spray invisible oil, not drop juice.',
            'You will know why rubbing the peel on the rim of the glass is actually a critical flavor step.',
            'You will stop putting thoughtless wedges of fruit on drinks that don\'t need them.'
        ],
        keyTakeaways: [
            '80% of what you "taste" is actually what you smell; aromatic garnishes take advantage of this.',
            'Expressing a citrus peel sprays highly concentrated, fragrant oils across the surface of the drink.',
            'A garnish should never be purely decorative; it must serve an aromatic, functional, or psychological purpose.'
        ],
        quiz: [
            { question: 'When a recipe tells you to "Express" an orange peel over a drink, what are you actually trying to do?', options: ['Squeeze actual fruit juice into the drink', 'Spray the invisible, highly aromatic oils stored in the skin across the surface of the drink', 'Make the rim sticky'], correctAnswerIndex: 1 },
            { question: 'Which of the following is an example of a Functional garnish that actively changes the flavor of the liquid it sits in?', options: ['A paper umbrella', 'A twist of lemon', 'A salt-cured olive in a Dirty Martini'], correctAnswerIndex: 2 },
            { question: 'Why is an aromatic garnish so critical to the experience of drinking?', options: ['Because 80% of perceived flavor is actually derived from smell', 'Because it lowers the ABV', 'Because it looks good on Instagram'], correctAnswerIndex: 0 }
        ],
        featuredCocktailId: 'Negroni'
    },
    {
        id: 'dilution-control',
        title: 'Over-Dilution vs Under-Dilution',
        pillar: 'Technique School',
        difficulty: 'Advanced',
        tags: ['Technique', 'Structure'],
        description: 'How to diagnose and repair drinks that are "too hot" or "too flat".',
        content: [
            'Mastering dilution is the dividing line between an amateur making a drink at home and a professional bartender. A drink is an extremely fragile kinetic system. Every second the ice touches the liquid, it is dying.',
            'Under-dilution happens when a drink isn\'t stirred long enough, or stirred with ice that is too brutally cold straight from the freezer. The resulting liquid will taste disjointed, syrupy, and aggressively hot with ethanol burn. Over-dilution happens when a drink is shaken too violently with "wet" melting ice, or left to sit dead in the tin before pouring. The result tastes flat, hollow, and lifeless, like an unseasoned soup.',
            'The Daiquiri is the ultimate lie detector test for dilution control. Shake it too long, and the vibrant sharp rum and lime instantly turns watery and limp. Shake it too little, and it snaps your palate with aggressive, harsh acid. It demands exactly 12 seconds of violent aeration over solid, dense ice to achieve that ephemeral, frosted glass perfection.'
        ],
        whyItMatters: [
            'You will learn how to troubleshoot your own cocktails when they taste "off" despite following the recipe.',
            'You will realize that adding a tiny splash of water to a hot whiskey cocktail is actually a professional move.',
            'You will stop leaving the ice rattling in the shaker for five extra seconds while you talk to friends.'
        ],
        keyTakeaways: [
            'Under-dilution results in drinks that taste aggressively hot, syrupy, and disjointed.',
            'Over-dilution results in drinks that taste watery, flat, and entirely lacking in structural body.',
            'Precision timing and ice density control the delicate balance between the two.'
        ],
        quiz: [
            { question: 'If you sip a freshly stirred Manhattan and the whiskey completely burns your throat and tastes distinctly disjointed from the sweet vermouth, what likely happened?', options: ['It is over-diluted', 'It is under-diluted and needs to be stirred over ice longer', 'It needs more bitters'], correctAnswerIndex: 1 },
            { question: 'What is the most common cause of an "over-diluted" cocktail?', options: ['Shaking the drink violently for too long with very wet, rapidly melting ice', 'Using too much base spirit', 'Stirring the drink for five seconds'], correctAnswerIndex: 0 },
            { question: 'Why is the Daiquiri considered the ultimate lie detector test for bartenders?', options: ['Because rum goes bad quickly', 'Because the delicate tension of rum to lime is instantly ruined by either under-shaking or over-shaking it', 'Because it requires very expensive sugar'], correctAnswerIndex: 1 }
        ],
        featuredCocktailId: 'Daiquiri'
    }
];
