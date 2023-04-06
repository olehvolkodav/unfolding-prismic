const books = "Exodus, 1 Samuel, 2 Samuel, Ezra, Nehemiah, Esther, Obadiah, Luke, Acts, Ephesians, 1 Timothy, 2 Timothy, James, 1 John, 2 John".split(",")
const books_complete = []

const content_goals = books.map((b)=>{
  return {
    key: b.trim().toLowerCase().replace(" ", "-"), 
    label: b.trim(), 
    qty: {
      label: null, 
    },
    status: Number(books_complete.includes(b.trim())), 
  }
}).sort((a, b) => b.status - a.status)

export const russian = {
  overview: {}, 
  data: [
    {
      key: "content", 
      label: "Content",
      description: "In this phase of the Latin American Spanish Gateway Language Project, we will focus on translating 10 Book Packages of Scripture and Bible translation resources, translating Open Bible Stories and training more translators to do this work.",  
      link: "https://www.unfoldingword.com", 
      children: [ 
        {
          format: {
            type: "badge", 
          },
          key: "book-packages", 
          label: "Book Packages", 
          summary: {
            percentage: "30%", 
            short_desc: "3 OF 10 BOOK PACKAGES COMPLETE", 
            long_description: "Books of the Bible — and all the necessary resosurces needed to accurately translate them — are being translated into Russian. Once a Book Package is complete, it can be used to translate that book of the Bible into hundreds of languages connected to Russian!",
            link: null
          }, 
          goals: content_goals, 
          impact: []
        },
        {
          format: {
            type: "metric", 
          },
          key: "obs", 
          label: "Open Bible Stories", 
          summary: {
            percentage: "33%", 
            short_desc: "1 OF 3 Goals Complete", 
            long_description: "Fifty Bible stories spanning Genesis to Revelation. The team will produce four Audio OBS packages and reach more than 75,000 people.",
            link: null
          }, 
          goals: [], 
          impact: [
            {
              key: "reach", 
              label: "People Reached", 
              qty: {
                label: "TBD",
              }
            }
          ]
        },
      ],
    },
    {
      key: "tools", 
      label: "Tools",
      description: "Three of our most important translation and translation checking tools are being localized into Russian.",  
      link: "https://www.unfoldingword.com", 
      children: [ 
        {
          format: {
            type: "icon", 
            icon: "check", 
          },
          key: "tools", 
          label: "Tools", 
          summary: {
            percentage: "33%", 
            short_desc: "1 OF 3 Goals Complete", 
            long_description: "Our partners are localizing four translation and translation checking tools. These tools help Bible translators swiftly and accurately translate Scripture.",
            link: null
          }, 
          goals: [
            {
              key: "tccreate", 
              label: "tC Create", 
              qty: {
                label: "",
              },
              status: 0, 
            },
            {
              key: "translationcore", 
              label: "translationCore", 
              qty: {
                label: "",
              },
              status: 0, 
            },
            {
              key: "translationstudio", 
              label: "translationStudio", 
              qty: {
                label: "",
              },
              status: 0, 
            },
          ], 
          impact: []
        }

      ],
    },
    {
      key: "training", 
      label: "Training",
      description: "Our Russian Gateway Language team is training translators from other people groups to use unfoldingWord tools to translate the Bible and check their work themselves.",  
      link: "https://www.unfoldingword.com", 
      children: [ 
        {
          format: {
            type: "metric", 
          },
          key: "training", 
          label: "Training", 
          summary: {
            percentage: "33%", 
            short_desc: "1 OF 3 Goals Complete", 
            long_description: "Our workshops teach fundamentals of accurate Bible translation and translation checking.",
            link: null
          }, 
          goals: [
            {
              key: "number-workshops", 
              label: "Workshops Hosted", 
              qty: {
                label: "≥ 45",
              },
              status: 0, 
            }
          ], 
          impact: []
        },
        {
          format: {
            type: "metric", 
          },
          key: "individuals-trained", 
          label: "Individuals Trained", 
          summary: {
            percentage: "33%", 
            short_desc: "1 OF 3 Goals Complete", 
            long_description: "Outside of seminars, individuals and small groups get coaching online or in-person.",
            link: null
          }, 
          goals: [
            {
              key: "number-trained", 
              label: "Individuals Trained", 
              qty: {
                label: "≥ 18",
              },
              status: 0, 
            }
          ], 
          impact: []
        },
        

      ],
    },
  ]
}

russian.data.forEach((p,pkey)=>{
  p.children.forEach((c,ckey)=>{
    const goals = c.goals.length
    const complete = c.goals.filter(g => g.status === 1).length
    russian.data[pkey].children[ckey].summary.percentage = `${Math.round(complete/goals * 100)}%`
    russian.data[pkey].children[ckey].summary.short_desc = `${complete} of ${goals} Complete`
  })
})