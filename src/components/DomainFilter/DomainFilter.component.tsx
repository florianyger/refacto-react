import React, {FC, useEffect, useState} from 'react';

interface State {
  countries: string[],
  classifications: string[],
  subClassifications: string[]
}

interface DomainFilterProps {
  domains: string[]
}

const DomainFilter: FC<DomainFilterProps> = ({ domains }) => {
  const [state, setState] = useState<State>({
    countries: [],
    classifications: [],
    subClassifications: []
  });

  useEffect((): void => {
    for(let i = 0; i < domains.length; i++) {
      if (state.countries.indexOf(domains[i].substring(0,2)) <= 0) {
        state.countries.push(domains[i].substring(0,2))
      }
      state.classifications.push(domains[i].substring(3,5));
      let flag = false;
      for(let j = 0; j < state.subClassifications.length; j++) {
        if (state.subClassifications[j] == domains[i].substring(6)) {
          flag = true
          break;
        }
      }
      if (!flag) {
        state.subClassifications.push(domains[i].substring(6));
      }
    }

    setState({
      ...state,
      classifications: state.classifications.filter((e, i, l) => l.indexOf(e) === i),
    })
  }, []);


    return <>
      <select name="countries" multiple>
        {state.countries.map(country => (
          <option value={country} key={country}>{country}</option>
        ))}
      </select>
      <select name="classifications" multiple>
        {state.classifications.map(classification => (
          <option value={classification} key={classification}>{classification}</option>
        ))}
      </select>
      <select name="subClassifications" multiple>
        {state.subClassifications.map(subClassification => (
          <option value={subClassification} key={subClassification}>{subClassification}</option>
        ))}
      </select>
    </>
}

export default DomainFilter
