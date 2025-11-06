// Demo Project Data

function createDemoProject() {
    const demoMemories = [
        {
            id: generateUUID(),
            title: "The Last Summer at the Lake",
            narrative: "The cabin smelled like pine and forty years of memories. That summer, before everything changed, we spent our days on the water and our evenings watching the sunset paint the sky in impossible colors. I didn't know it would be the last time we'd all be together like that.",
            datePeriod: {
                year: 2010,
                season: "Summer",
                precision: "approximate"
            },
            emotionalTone: 4,
            sensoryDetails: {
                sights: ["golden sunset", "lake reflections", "old wooden dock"],
                sounds: ["loons calling", "waves lapping", "screen door creaking"],
                smells: ["pine trees", "lake water", "campfire smoke"],
                textures: ["warm wood", "cool water", "soft sand"],
                tastes: ["marshmallows", "lake water", "Mom's lemonade"]
            },
            themes: {
                userTags: ["family", "endings", "nature", "childhood"],
                suggestedTags: ["transition", "nostalgia"]
            },
            characters: ["Mom", "Dad", "Sister Sarah", "Uncle Tom"],
            location: "Lake cabin, Minnesota",
            notes: "This was before Dad got sick. The last perfect summer.",
            images: [],
            position: { x: 200, y: 150 }
        },
        {
            id: generateUUID(),
            title: "The Phone Call",
            narrative: "I was at work when my phone rang. Mom's voice was steady, too steady, the way it gets when she's trying not to break. 'It's your father,' she said. 'You should come home.' Everything after that felt like moving through water.",
            datePeriod: {
                year: 2011,
                season: "March",
                precision: "exact"
            },
            emotionalTone: -4,
            sensoryDetails: {
                sights: ["fluorescent office lights", "empty hallway", "gray sky"],
                sounds: ["phone ringing", "Mom's trembling voice", "heart pounding"],
                smells: ["stale coffee", "fear"],
                textures: ["cold phone", "shaking hands"],
                tastes: ["metallic fear", "bitter coffee"]
            },
            themes: {
                userTags: ["loss", "family", "crisis"],
                suggestedTags: ["call-to-adventure", "threshold"]
            },
            characters: ["Mom", "Dad", "boss"],
            location: "Office building, downtown",
            notes: "The moment everything changed. There's a before and after this call.",
            images: [],
            position: { x: 350, y: 200 }
        },
        {
            id: generateUUID(),
            title: "Sorting Through His Things",
            narrative: "Six months after the funeral, we finally opened his study. Every object told a story: his reading glasses folded on a half-read book, Post-it notes with his handwriting, a drawer full of letters he'd saved. I found a note he'd written to me years ago that I'd never seen. 'Be brave,' it said. 'You're capable of more than you know.'",
            datePeriod: {
                year: 2012,
                season: "September",
                precision: "approximate"
            },
            emotionalTone: -2,
            sensoryDetails: {
                sights: ["dust in sunlight", "yellowed papers", "his handwriting"],
                sounds: ["silence", "rustling paper", "distant traffic"],
                smells: ["old books", "his cologne faintly", "dust"],
                textures: ["worn leather chair", "smooth paper", "cold doorknob"],
                tastes: ["salt tears", "coffee gone cold"]
            },
            themes: {
                userTags: ["loss", "memory", "discovery", "guidance"],
                suggestedTags: ["mentor", "inheritance"]
            },
            characters: ["Dad (memory)", "Mom", "Sister Sarah"],
            location: "Family home, Dad's study",
            notes: "Found the note. It changed something. He was still teaching me.",
            images: [],
            position: { x: 450, y: 250 }
        },
        {
            id: generateUUID(),
            title: "The New Job",
            narrative: "I almost didn't apply. The old me would never have considered moving across the country, starting over. But I kept thinking about that note. 'Be brave.' So I sent the application at 11:59 PM on the deadline. Three weeks later, they called with an offer.",
            datePeriod: {
                year: 2013,
                season: "January",
                precision: "exact"
            },
            emotionalTone: 1,
            sensoryDetails: {
                sights: ["laptop screen glowing", "midnight darkness", "city lights"],
                sounds: ["keyboard clicking", "heart racing", "celebratory call"],
                smells: ["coffee at midnight", "fresh possibilities"],
                textures: ["laptop keys", "shaking hands typing"],
                tastes: ["adrenaline", "hope"]
            },
            themes: {
                userTags: ["courage", "change", "new beginning"],
                suggestedTags: ["threshold", "call-to-adventure"]
            },
            characters: ["hiring manager", "Mom on phone"],
            location: "Apartment, late at night",
            notes: "Taking the leap. Dad would have been proud.",
            images: [],
            position: { x: 500, y: 150 }
        },
        {
            id: generateUUID(),
            title: "First Day in the New City",
            narrative: "Everything felt wrong at first. The coffee was different. The subway smelled unfamiliar. I didn't know anyone. I sat in my new apartment surrounded by boxes and wondered if I'd made a terrible mistake. Then I looked out the window and saw the city lights, thousands of lives happening simultaneously, and thought: I'm part of this now.",
            datePeriod: {
                year: 2013,
                season: "March",
                precision: "approximate"
            },
            emotionalTone: -1,
            sensoryDetails: {
                sights: ["city lights", "unpacked boxes", "unfamiliar streets"],
                sounds: ["sirens", "voices in other languages", "silence in apartment"],
                smells: ["different coffee", "new paint", "city air"],
                textures: ["cardboard boxes", "cold window glass", "hard floors"],
                tastes: ["takeout food", "local coffee", "uncertainty"]
            },
            themes: {
                userTags: ["change", "solitude", "new beginning"],
                suggestedTags: ["tests", "adaptation"]
            },
            characters: ["myself"],
            location: "New apartment, Seattle",
            notes: "The hardest part: being alone with the choice I made.",
            images: [],
            position: { x: 600, y: 200 }
        },
        {
            id: generateUUID(),
            title: "Finding My People",
            narrative: "I met Maria at a coffee shop when we both reached for the same book. We laughed, got talking, and suddenly I had a friend. She introduced me to James and Alex. Within months, I had a chosen family. We created our own traditions: Sunday morning hikes, Thursday trivia nights, holidays together. They became my witnesses.",
            datePeriod: {
                year: 2014,
                season: "throughout the year",
                precision: "approximate"
            },
            emotionalTone: 3,
            sensoryDetails: {
                sights: ["hiking trails", "cozy coffee shops", "friends laughing"],
                sounds: ["shared laughter", "conversations", "inside jokes"],
                smells: ["coffee brewing", "pizza nights", "fresh air on hikes"],
                textures: ["warm hugs", "high fives", "comfortable couch"],
                tastes: ["shared meals", "birthday cake", "celebration"]
            },
            themes: {
                userTags: ["friendship", "belonging", "chosen family"],
                suggestedTags: ["allies", "support-system"]
            },
            characters: ["Maria", "James", "Alex"],
            location: "Seattle - various locations",
            notes: "They became my proof that I made the right choice.",
            images: [],
            position: { x: 650, y: 100 }
        },
        {
            id: generateUUID(),
            title: "The Crisis at Work",
            narrative: "The project failed spectacularly. My fault, my responsibility. I'd never failed that publicly before. I stood in the conference room while they dissected everything I'd done wrong, and I wanted to disappear. Afterward, my boss said, 'Now you know what you're made of. What are you going to do with that knowledge?'",
            datePeriod: {
                year: 2015,
                season: "November",
                precision: "exact"
            },
            emotionalTone: -3,
            sensoryDetails: {
                sights: ["harsh conference room lights", "disappointed faces", "failure on screen"],
                sounds: ["critical voices", "silence that followed", "my heartbeat"],
                smells: ["stale air", "coffee gone cold", "sweat"],
                textures: ["cold table", "clenched fists", "tight chest"],
                tastes: ["shame", "adrenaline", "regret"]
            },
            themes: {
                userTags: ["failure", "growth", "resilience"],
                suggestedTags: ["ordeal", "test"]
            },
            characters: ["boss", "team members", "myself"],
            location: "Office conference room",
            notes: "The worst professional moment became the most important one.",
            images: [],
            position: { x: 700, y: 250 }
        },
        {
            id: generateUUID(),
            title: "Rebuilding",
            narrative: "I came in early, stayed late. I learned from every mistake. I asked for help, which was harder than failing. Slowly, the next project came together. When we presented it six months later and it succeeded, my boss nodded once. That nod meant everything. I'd proven I could fail and get back up.",
            datePeriod: {
                year: 2016,
                season: "May",
                precision: "approximate"
            },
            emotionalTone: 2,
            sensoryDetails: {
                sights: ["sunrise through office windows", "progress charts", "approving smiles"],
                sounds: ["collaborative discussions", "applause", "relieved laughter"],
                smells: ["fresh coffee", "success"],
                textures: ["firm handshakes", "celebratory hugs", "confident posture"],
                tastes: ["victory champagne", "accomplishment", "pride"]
            },
            themes: {
                userTags: ["perseverance", "success", "growth"],
                suggestedTags: ["reward", "transformation"]
            },
            characters: ["boss", "team", "myself evolved"],
            location: "Office - multiple spaces",
            notes: "The comeback was better than the original journey.",
            images: [],
            position: { x: 750, y: 150 }
        },
        {
            id: generateUUID(),
            title: "Returning Home",
            narrative: "Five years later, I went back to Minnesota for the holidays. The lake cabin was sold now, but we gathered at Mom's house. Sarah had kids. Mom had aged, but gracefully. I realized I was different too - stronger, more myself. Mom said, 'Your father would be so proud.' And I knew it was true.",
            datePeriod: {
                year: 2018,
                season: "December",
                precision: "exact"
            },
            emotionalTone: 4,
            sensoryDetails: {
                sights: ["snow falling", "Christmas lights", "family gathered", "old photos on walls"],
                sounds: ["children laughing", "familiar voices", "Christmas music"],
                smells: ["Mom's cooking", "pine tree", "home"],
                textures: ["warm sweaters", "hugs", "familiar furniture"],
                tastes: ["holiday cookies", "hot cocoa", "nostalgia", "peace"]
            },
            themes: {
                userTags: ["family", "transformation", "homecoming", "completion"],
                suggestedTags: ["return", "wisdom", "full-circle"]
            },
            characters: ["Mom", "Sister Sarah", "Sarah's kids", "Dad (memory)"],
            location: "Mom's house, Minnesota",
            notes: "The return. I brought back a different version of myself.",
            images: [],
            position: { x: 400, y: 100 }
        }
    ];

    // Generate connections
    const connections = findMemoryConnections(demoMemories);

    return {
        id: 'demo-project',
        title: "Demo: A Journey of Transformation",
        created: Date.now(),
        modified: Date.now(),
        memories: demoMemories,
        connections: connections,
        timelineStructure: {
            acts: [],
            currentOrder: demoMemories.map(m => m.id)
        }
    };
}
