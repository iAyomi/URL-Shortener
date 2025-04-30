interface HyperlinkProps {
  link: string;
  children: React.ReactNode;
  self?: boolean;
}

const Hyperlink = ({ link, children }: HyperlinkProps) => {
  return (
    <a
      href={link}
      target={self ? "_self" : "_blank"}
      rel="noopener noreferrer"
      className="bg-gray-300 text-xs text-black font-medium p-2 rounded cursor-pointer md:text-sm"
    >
      {children}
    </a>
  );
};

export default Hyperlink;
