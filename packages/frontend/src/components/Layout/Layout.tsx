import React, { Component, ReactNode } from 'react';
import Helmet from 'react-helmet';
import styles from './Layout.module.scss';
import StarImg from './stars.png';

export default class Layout extends Component {
  public render(): ReactNode {
    const { children } = this.props;

    return (
      <div
        className={styles.wrapper}
        style={{ backgroundImage: `url(${StarImg})` }}
      >
        <Helmet>
          <meta charSet="utf-8" />
          <title>Star Wars Fattest Characters</title>
          <meta
            name="description"
            content="A list of the fattest star wars characters, in order to save the universe"
          />
        </Helmet>
        <div className={styles.layout}>{children}</div>
      </div>
    );
  }
}
