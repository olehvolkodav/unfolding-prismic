const books = "Ruth,Nehemiah,Esther,Obadiah,Jonah,Luke,Ephesians,1 Timothy,2 Timothy,Titus,1 John,2 John,3 John".split(",")
const books_complete = ["Ruth", "Titus", "3 John"]

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

export const spanish = {
  overview: {}, 
  data: [
    {
      key: "content", 
      label: "Content",
      description: "In this phase of the Latin American Spanish Gateway Language Project, we will focus on translating 13 Book Packages of Scripture and Bible translation resources, translating Open Bible Stories and training more translators to do this work.",  
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
            long_description: "Books of the Bible — and all the necessary resosurces needed to accurately translate them — are being translated into Spanish. Once a Book Package is complete, it can be used to translate that book of the Bible into hundreds of languages connected to Spanish!",
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
          goals: [
            {
              key: "print", 
              label: "Print Translations", 
              qty: {
                label: "1",
              },
              status: 1, 
            },
          ], 
          impact: [
            {
              key: "reach", 
              label: "People Reached", 
              qty: {
                label: "≥ 75k",
              }
            }
          ]
        },
        {
          format: {
            type: "icon", 
            icon: "pdf", 
          },
          key: "whitepapers", 
          label: "Whitepapers", 
          summary: {
            percentage: "33%", 
            short_desc: "1 OF 3 Goals Complete", 
            long_description: "Our partners are translating five of unfoldingWord’s expert whitepapers in this phase of the project. These whitepapers explain what it means to equip the worldwide church networks to translate the Bible accurately themselves and how to achieve that.",
            link: null
          }, 
          goals: [
            {
              key: "gateway-manual", 
              label: "The Gateway Languages Manual", 
              qty: {
                label: "",
              },
              status: 1, 
            },
            {
              key: "gateway-strategy", 
              label: "The Gateway Languages Strategy", 
              qty: {
                label: "",
              },
              status: 1, 
            },
            {
              key: "trustworthy-trusted", 
              label: "Trustworthy and Trusted", 
              qty: {
                label: "",
              },
              status: 1, 
            },
            {
              key: "unreached-established", 
              label: "From Unreached to Established", 
              qty: {
                label: "",
              },
              status: 1, 
            },
            {
              key: "christian-commons", 
              label: "The Christian Commons", 
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
      key: "tools", 
      label: "Tools",
      description: "Four of our most important translation and translation checking tools are being localized into Spanish.",  
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
              status: 1, 
            },
            {
              key: "translationstudio", 
              label: "translationStudio", 
              qty: {
                label: "",
              },
              status: 1, 
            },
            {
              key: "project-tracker", 
              label: "Gateway Language Project Tracker", 
              qty: {
                label: "",
              },
              status: 1, 
            },
          ], 
          impact: []
        }

      ],
    },
    {
      key: "training", 
      label: "Training",
      description: "Our Latin American Spanish team is training translators from other people groups to use unfoldingWord tools to translate the Bible and check their work themselves.",  
      link: "https://www.unfoldingword.com", 
      children: [ 
        {
          format: {
            type: "metric", 
          },
          key: "workshops", 
          label: "Workshops", 
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
                label: "≥ 150",
              },
              status: 0, 
            }
          ], 
          impact: [
            {
              key: "workshops-completed", 
              label: "Workshops Completed", 
              qty: {
                label: "≥ 60",
              }
            }, 
            {
              key: "people-attending", 
              label: "Individuals Attending", 
              qty: {
                label: "≥ 180",
              }
            }
          ]
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
                label: "≥ 150",
              },
              status: 0, 
            }
          ], 
          impact: [
            {
              key: "individuals-trained", 
              label: "Individuals Trained", 
              qty: {
                label: "≥ 25",
              }
            }
          ]
        },
        

      ],
    },
  ]
}

spanish.data.forEach((p,pkey)=>{
  p.children.forEach((c,ckey)=>{
    const goals = c.goals.length
    const complete = c.goals.filter(g => g.status === 1).length
    spanish.data[pkey].children[ckey].summary.percentage = `${Math.round(complete/goals * 100)}%`
    spanish.data[pkey].children[ckey].summary.short_desc = `${complete} of ${goals} Complete`
  })
})