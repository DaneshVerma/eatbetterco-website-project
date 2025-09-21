import { useEffect, useState, useRef } from "react";

const TypingText = ({ text = "", speed = 45, className = "", as = "span" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const index = useRef(0);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index.current));
      index.current += 1;
      if (index.current === text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [visible, text, speed]);

  const Component = as;
  return (
    <Component ref={ref} className={className}>
      {displayedText}
    </Component>
  );
};

export default TypingText;
