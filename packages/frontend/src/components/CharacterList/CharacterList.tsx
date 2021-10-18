import React, { Component, ReactNode } from 'react';
import UnderConstruction from './under_construction.svg';
import Cancel from './undraw_cancel.svg';
import styles from './CharacterList.module.scss';
import Table from 'react-bootstrap/Table';
import { v4 as uuidv4 } from 'uuid';

interface Character {
  id: string;
  name: string;
  bmi: number;
}

interface CharacterFull extends Character {
  [propName: string]: any;
}

interface CharacterListState {
  isLoading: boolean;
  data?: Array<CharacterFull>;
  error?: { statusCode?: number; message: string };
}

export default class CharacterList extends Component<
  unknown,
  CharacterListState
> {
  state: CharacterListState = {
    isLoading: true,
  };

  public componentDidMount(): void {
    fetch('http://localhost:3000/top-fat-characters').then(
      async (data) => {
        if (data.ok) {
          this.setState({
            isLoading: false,
            data: await data.json(),
          });
        } else {
          this.setState({
            isLoading: false,
            error: {
              message: await data.json(),
              statusCode: data.status,
            },
          });
        }
      },
      (error) => {
        this.setState({
          isLoading: false,
          error: {
            message: error.message,
          },
        });
      }
    );
  }

  public render(): ReactNode {
    return (
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <span>Top fattest characters Star Wars characters</span>
        </div>
        <div>{this.renderList()}</div>
      </div>
    );
  }

  renderList = (): ReactNode => {
    const { isLoading, data, error } = this.state;

    if (isLoading && data === undefined && error === undefined) {
      return this.renderListLoading();
    } else if (data) {
      return this.renderListData();
    } else if (error) {
      return this.renderListError();
    } else {
      // UNREACHABLE
      return this.renderListLoading();
    }
  };

  renderListLoading = (): ReactNode => {
    return (
      <div className={styles.infoWrapper}>
        <span className={styles.infoText}>Loading...</span>
      </div>
    );
  };

  renderListError = (): ReactNode => {
    const { error } = this.state;

    if (error && error.statusCode === 501) {
      return (
        <div className={styles.infoWrapper}>
          <span className={styles.infoText}>{error.message}</span>
          <UnderConstruction />
          <span className={styles.descriptionText}>
            Your Mission: Fix this list so that it contains the top 20 fattest
            star wars characters!
          </span>
        </div>
      );
    }

    if (error && error.message === 'Failed to fetch') {
      return (
        <div className={styles.infoWrapper}>
          <span className={styles.infoText}>
            Could not contact backend. Is your service up and running, or
            perhaps the code is broken?
          </span>
          <Cancel />
          <span className={styles.descriptionText}>
            Your Mission: Fix this list so that it contains the top 20 fattest
            star wars characters!
          </span>
        </div>
      );
    }

    if (error && error.statusCode) {
      return (
        <span className={styles.infoText}>
          {error.statusCode}: {error.message}
        </span>
      );
    } else {
      return <span className={styles.infoText}>{error?.message}</span>;
    }
  };

  renderListData = (): ReactNode => {
    const { data } = this.state;
    const characterList: Character[] = [];

    if (data) {
      data.forEach((person) => {
        let bmi = 0;
        if (person.mass !== 'unknown' && person.height !== 'unknown') {
          bmi =
            (parseInt(person.mass) / Math.pow(parseInt(person.height), 2)) *
            10000;
        } else {
          bmi = 0;
        }
        const character: Character = {
          id: uuidv4(),
          name: person.name,
          bmi: bmi,
        };
        characterList.push(character);
      });
    }
    characterList.sort((a, b) => {
      return b.bmi - a.bmi;
    });

    return (
      <div className={styles.infoText + ' ' + styles.scrollbar}>
        <Table
          striped
          bordered
          hover
          variant="dark"
          className={styles.characterTable}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>BMI</th>
            </tr>
          </thead>
          <tbody>
            {characterList.map((character, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{character.name}</td>
                {character.bmi === 0 ? (
                  <td>-</td>
                ) : (
                  <td>{character.bmi.toFixed(2)}</td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };
}
