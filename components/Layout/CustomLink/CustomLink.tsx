import React from 'react';
import Link from 'next/link';
import LinkWrapper from './CustomLink.styles';

type Props = {
  href: string;
  title: string;
  img?: string;
  active?: boolean;
};

const CustomLink = ({ href, active, title, img }: Props) => {
  return (
    <Link href={href}>
      <li>
        {img ? <img src={`https://image.tmdb.org/t/p/w300${img}`} alt="picture" /> : null}
        <LinkWrapper active={active}>{title}</LinkWrapper>
      </li>
    </Link>
  );
};

export default CustomLink;
