import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Create a Deck",
    description:
      "Organise your study material into decks by subject — JavaScript, Biology, History, anything.",
  },
  {
    number: "02",
    title: "Add Your Cards",
    description:
      "Write a question on the front and the answer on the back. Add as many cards as you need.",
  },
  {
    number: "03",
    title: "Review & Rate",
    description:
      "Flip each card, recall the answer, then rate how well you knew it from 0 to 5.",
  },
  {
    number: "04",
    title: "The Algorithm Does the Rest",
    description:
      "SM-2 calculates exactly when to show each card again — right before you'd forget it.",
  },
];

const features = [
  {
    icon: "◈",
    title: "Spaced Repetition",
    description:
      "The SM-2 algorithm schedules your reviews scientifically. Cards you know well appear less often. Cards you struggle with come back sooner.",
  },
  {
    icon: "◉",
    title: "Organised Decks",
    description:
      "Keep your study material separated by subject. Switch between topics without losing your place.",
  },
  {
    icon: "◐",
    title: "Track Your Progress",
    description:
      "Every card tracks its own review history — interval, ease factor, and next review date — so nothing slips through.",
  },
  {
    icon: "◑",
    title: "Secure & Personal",
    description:
      "Your decks and cards are private to your account. JWT authentication keeps everything secure.",
  },
];

const Homepage = () => {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>

      {/* Nav */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.25rem 3rem",
        borderBottom: "1.5px solid var(--border-light)",
        background: "var(--bg)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.3rem",
          fontWeight: 700,
          color: "var(--ink)",
          letterSpacing: "-0.01em",
        }}>
          Memori
        </span>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link to="/login" style={{
            fontFamily: "'Crimson Text', serif",
            fontSize: "1rem",
            color: "var(--ink-light)",
            textDecoration: "none",
            padding: "0.4rem 1rem",
            transition: "color 0.2s",
          }}>
            Sign in
          </Link>
          <Link to="/register" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "var(--bg)",
            background: "var(--ink)",
            textDecoration: "none",
            padding: "0.5rem 1.25rem",
            borderRadius: "2px",
            transition: "background 0.2s",
          }}>
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        maxWidth: "860px",
        margin: "0 auto",
        padding: "6rem 2rem 4rem",
        textAlign: "center",
      }}>
        <p style={{
          fontFamily: "'Crimson Text', serif",
          fontSize: "0.85rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: "1.5rem",
        }}>
          Spaced Repetition Flashcards
        </p>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
          fontWeight: 700,
          color: "var(--ink)",
          lineHeight: 1.1,
          marginBottom: "1.5rem",
          letterSpacing: "-0.02em",
        }}>
          Study less.<br />Remember more.
        </h1>
        <p style={{
          fontFamily: "'Crimson Text', serif",
          fontSize: "1.25rem",
          color: "var(--ink-light)",
          lineHeight: 1.7,
          maxWidth: "560px",
          margin: "0 auto 2.5rem",
          fontStyle: "italic",
        }}>
          Memori uses the proven SM-2 algorithm to show you each card at exactly
          the right moment — right before you'd forget it.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/register" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1rem",
            fontWeight: 700,
            color: "white",
            background: "var(--accent)",
            textDecoration: "none",
            padding: "0.85rem 2.5rem",
            borderRadius: "2px",
            letterSpacing: "0.03em",
            transition: "background 0.2s, transform 0.1s",
            display: "inline-block",
          }}>
            Start for free →
          </Link>
          <Link to="/login" style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1rem",
            fontWeight: 600,
            color: "var(--ink)",
            background: "transparent",
            textDecoration: "none",
            padding: "0.85rem 2.5rem",
            borderRadius: "2px",
            border: "1.5px solid var(--border)",
            letterSpacing: "0.03em",
            display: "inline-block",
          }}>
            Sign in
          </Link>
        </div>
      </section>

      {/* Decorative card stack */}
      <section style={{
        display: "flex",
        justifyContent: "center",
        padding: "1rem 2rem 5rem",
      }}>
        <div style={{ position: "relative", width: "420px", height: "200px" }}>
          {[
            { rotate: "-6deg", top: "20px", left: "20px", bg: "#DFC882", opacity: 0.5 },
            { rotate: "-3deg", top: "10px", left: "10px", bg: "#E8D5A3", opacity: 0.7 },
            { rotate: "0deg", top: "0px", left: "0px", bg: "var(--card-bg)", opacity: 1 },
          ].map((style, i) => (
            <div key={i} style={{
              position: "absolute",
              width: "420px",
              height: "180px",
              background: style.bg,
              border: "1.5px solid var(--border)",
              borderRadius: "3px",
              transform: `rotate(${style.rotate})`,
              top: style.top,
              left: style.left,
              opacity: style.opacity,
              boxShadow: i === 2 ? "4px 4px 0 var(--border)" : "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
            }}>
              {i === 2 && (
                <>
                  <p style={{
                    fontFamily: "'Crimson Text', serif",
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--border)",
                    marginBottom: "0.75rem",
                  }}>Question</p>
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    color: "var(--ink)",
                    textAlign: "center",
                  }}>
                    What is the SM-2 algorithm?
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{
        background: "var(--bg-dark)",
        borderTop: "1.5px solid var(--border-light)",
        borderBottom: "1.5px solid var(--border-light)",
        padding: "5rem 2rem",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p style={{
            fontFamily: "'Crimson Text', serif",
            fontSize: "0.85rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "0.75rem",
            textAlign: "center",
          }}>
            How it works
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.2rem",
            fontWeight: 700,
            color: "var(--ink)",
            textAlign: "center",
            marginBottom: "3.5rem",
          }}>
            Four steps to mastery
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
          }}>
            {steps.map((step) => (
              <div key={step.number} style={{
                background: "var(--card-bg)",
                border: "1.5px solid var(--border)",
                padding: "1.75rem",
                boxShadow: "3px 3px 0 var(--border-light)",
              }}>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "var(--border-light)",
                  marginBottom: "0.5rem",
                  lineHeight: 1,
                }}>
                  {step.number}
                </p>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: "0.6rem",
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: "'Crimson Text', serif",
                  fontSize: "1rem",
                  color: "var(--ink-light)",
                  lineHeight: 1.6,
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p style={{
            fontFamily: "'Crimson Text', serif",
            fontSize: "0.85rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: "0.75rem",
            textAlign: "center",
          }}>
            Features
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.2rem",
            fontWeight: 700,
            color: "var(--ink)",
            textAlign: "center",
            marginBottom: "3.5rem",
          }}>
            Everything you need, nothing you don't
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
            gap: "1.5rem",
          }}>
            {features.map((f) => (
              <div key={f.title} style={{
                display: "flex",
                gap: "1.25rem",
                padding: "1.75rem",
                background: "var(--card-bg)",
                border: "1.5px solid var(--border-light)",
              }}>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.5rem",
                  color: "var(--accent)",
                  flexShrink: 0,
                  marginTop: "2px",
                }}>
                  {f.icon}
                </span>
                <div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--ink)",
                    marginBottom: "0.4rem",
                  }}>
                    {f.title}
                  </h3>
                  <p style={{
                    fontFamily: "'Crimson Text', serif",
                    fontSize: "1rem",
                    color: "var(--ink-light)",
                    lineHeight: 1.6,
                  }}>
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: "var(--ink)",
        padding: "5rem 2rem",
        textAlign: "center",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(196,163,90,0.08) 27px, rgba(196,163,90,0.08) 28px)",
      }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "2.5rem",
          fontWeight: 700,
          color: "var(--bg)",
          marginBottom: "0.75rem",
        }}>
          Ready to remember everything?
        </h2>
        <p style={{
          fontFamily: "'Crimson Text', serif",
          fontSize: "1.15rem",
          color: "var(--border)",
          fontStyle: "italic",
          marginBottom: "2.5rem",
        }}>
          Free to use. No credit card required.
        </p>
        <Link to="/register" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1rem",
          fontWeight: 700,
          color: "var(--ink)",
          background: "var(--bg)",
          textDecoration: "none",
          padding: "0.9rem 2.5rem",
          borderRadius: "2px",
          letterSpacing: "0.03em",
          display: "inline-block",
          transition: "background 0.2s",
        }}>
          Create your account →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: "1.5px solid var(--border-light)",
        padding: "1.5rem 3rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1rem",
          fontWeight: 700,
          color: "var(--ink)",
        }}>
          Memori
        </span>
        <p style={{
          fontFamily: "'Crimson Text', serif",
          fontSize: "0.9rem",
          color: "var(--ink-light)",
          fontStyle: "italic",
        }}>
          Built with Node.js, Express, PostgreSQL & React
        </p>
      </footer>

    </div>
  );
};

export default Homepage;