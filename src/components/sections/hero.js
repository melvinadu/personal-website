import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import useScrollBlock from '../../hooks/useScrollBlock';
// import { email } from '@config';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [blockScroll, allowScroll] = useScrollBlock();
  allowScroll();
  blockScroll();

  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  // const spanStyle=;

  const one = <h2>Hi, my name is</h2>;
  const two = (
    <h2 className="big-heading">
      <span style={{ color: '#64ffda' }}> Melvin Adu</span>.
    </h2>
  );
  const three = (
    <h3 className="big-heading">
      I <span style={{ color: '#64ffda' }}> build </span> & scale on the web.
    </h3>
  );
  const four = (
    <>
      <p>
        {/* Melvin Adu is an Entrepreneur who specializes in solving complex problems with technology
        and data.  */}
        Hello! My name is Melvin and I'm a Toronto-based Entrepreneur, Software Developer & Stock
        Trader.
        <br></br>
        <br></br>I specialize in solving complex problems with technology and data.
        <br></br>
        <br></br>
        Currently, I’m Making Commerce Better for Everyone{' '}
        <a href="https://shopify.com/" target="_blank" rel="noreferrer">
          at Shopify
        </a>
        .
      </p>
    </>
  );
  // const five = (
  //   <a
  //     className="email-link"
  //     href="https://www.newline.co/courses/build-a-spotify-connected-app"
  //     target="_blank"
  //     rel="noreferrer">
  //     Check out my course!
  //   </a>
  // ); TO-DO - add course

  const items = [one, two, three, four];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
