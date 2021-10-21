import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component, ReactNode } from 'react';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import styles from './Filter.module.scss';

interface FilterProps {
  starwarsData: any;
  onFilterStarwarsData(data: any): any;
}

export default class Filter extends Component<FilterProps> {
  filteredStarwarsData: any[] = [];
  state = {
    iconIsActive: false,
    buttonIsActive: { male: 'notActive', female: 'notActive' },
  };

  toggleActiveIcon = (): void => {
    this.setState({ iconIsActive: !this.state.iconIsActive }, () => {
      if (!this.state.iconIsActive) {
        this.setState(
          { buttonIsActive: { male: 'notActive', female: 'notActive' } },
          () => {
            this.setFilteredData();
          }
        );
      }
    });
  };

  toggleActiveGenderButton = (gender: string): void => {
    if (this.state.buttonIsActive.male === 'notActive' && gender === 'male') {
      this.setState(
        { buttonIsActive: { male: 'active', female: 'notActive' } },
        () => {
          this.setFilteredData();
        }
      );
    } else if (
      this.state.buttonIsActive.female === 'notActive' &&
      gender === 'female'
    ) {
      this.setState(
        { buttonIsActive: { male: 'notActive', female: 'active' } },
        () => {
          this.setFilteredData();
        }
      );
    } else {
      this.setState(
        { buttonIsActive: { male: 'notActive', female: 'notActive' } },
        () => {
          this.setFilteredData();
        }
      );
    }
  };

  setFilteredData(): void {
    this.filteredStarwarsData = [];
    const buttonIsActive = this.state.buttonIsActive;
    const { starwarsData } = this.props;

    const activeGender = this.getKeyByValue(buttonIsActive, 'active');
    if (activeGender) {
      starwarsData.forEach((character: any) => {
        if (character.gender === activeGender) {
          this.filteredStarwarsData.push(character);
        }
      });
    }
    this.sendData(this.filteredStarwarsData);
  }

  getKeyByValue(object: any, value: string): string | undefined {
    return Object.keys(object).find((key) => object[key] === value);
  }

  sendData(data: any[]): void {
    this.props.onFilterStarwarsData(data);
  }

  public render(): ReactNode {
    const iconIsActive = this.state.iconIsActive;
    const buttonIsActive = this.state.buttonIsActive;

    return (
      <div>
        <div className={styles.filterIconWrapper}>
          <FontAwesomeIcon
            className={
              iconIsActive
                ? styles.activeFilterIcon + ' ' + styles.filterIcon
                : undefined + ' ' + styles.filterIcon
            }
            onClick={(): void => this.toggleActiveIcon()}
            icon={faFilter}
          />
        </div>
        {iconIsActive ? (
          <div>
            <h6 className={styles.genderFilterTitle}>Gender</h6>
            <button
              className={
                buttonIsActive.male === 'active'
                  ? styles.activeFilterButton + ' ' + styles.filterButton
                  : undefined + ' ' + styles.filterButton
              }
              onClick={(): void => this.toggleActiveGenderButton('male')}
            >
              Male
            </button>
            <button
              className={
                buttonIsActive.female === 'active'
                  ? styles.activeFilterButton + ' ' + styles.filterButton
                  : undefined + ' ' + styles.filterButton
              }
              onClick={(): void => this.toggleActiveGenderButton('female')}
            >
              Female
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}
