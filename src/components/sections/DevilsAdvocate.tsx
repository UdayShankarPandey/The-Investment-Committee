import { useState } from 'react'
import { SectionLabel } from '../ui/SectionLabel'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

export function DevilsAdvocate() {
  const [challenged, setChallenged] = useState(false)
  const { domRef, isVisible } = useIntersectionObserver({ threshold: 0.25 })

  return (
    <section
      ref={domRef as React.RefObject<HTMLElement>}
      className={`devils-advocate ${isVisible ? 'is-visible' : ''}`}
      id="devils-advocate"
      aria-labelledby="devils-advocate-title"
    >
      <div className="container">
        <div className="devils-advocate__intro">
          <div className="reveal-fade">
            <SectionLabel>The devil's advocate</SectionLabel>
          </div>
          <h2 id="devils-advocate-title" className="reveal-up" style={{ transitionDelay: '150ms' }}>
            Every thesis deserves<br />to be challenged.
          </h2>
          <p className="reveal-fade" style={{ transitionDelay: '300ms' }}>
            Before the committee reaches a verdict, the case must survive its
            strongest counterargument. No thesis passes unchallenged.
          </p>
        </div>

        <div
          className={`advocate-stage reveal-fade${challenged ? ' advocate-stage--challenged' : ''}`}
          style={{ transitionDelay: '450ms' }}
        >
          <div className="advocate-thesis">
            <p className="advocate-label advocate-label--bull">
              <span aria-hidden="true">↑</span>The case for
            </p>
            <blockquote className="advocate-quote">
              <p>
                "Services durability may support the thesis through a softer
                device cycle, providing a revenue cushion that offsets hardware
                variability."
              </p>
            </blockquote>
            {challenged && (
              <span className="advocate-struck" aria-hidden="true" />
            )}
          </div>

          <div
            className="advocate-counter"
            aria-live="polite"
          >
            {challenged && (
              <div className="advocate-counter__inner">
                <p className="advocate-label advocate-label--advocate">
                  <span aria-hidden="true">⟁</span>The devil's advocate
                </p>
                <blockquote className="advocate-quote">
                  <p>
                    "That assumes durability survives a slower hardware cycle.
                    If device revenue contracts faster than services can
                    compensate, the cushion thesis unravels."
                  </p>
                </blockquote>
              </div>
            )}
          </div>
        </div>

        <div className="advocate-action reveal-scale" style={{ transitionDelay: '600ms' }}>
          <button
            className="button button--secondary advocate-trigger"
            type="button"
            onClick={() => setChallenged((prev) => !prev)}
            aria-expanded={challenged}
          >
            {challenged ? (
              <>Reset the thesis</>
            ) : (
              <>Challenge the thesis <span aria-hidden="true">→</span></>
            )}
          </button>
        </div>

        <p className="advocate-disclosure reveal-fade" style={{ transitionDelay: '750ms' }}>
          Illustrative reasoning · Not investment advice
        </p>
      </div>
    </section>
  )
}
