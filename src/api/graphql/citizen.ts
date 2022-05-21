import { gql } from "@apollo/client";

export const GetAllVaccines = gql`
  query getAllVaccines {
    getAllVaccines {
      id
      citizen {
        dni
        names
        fr_lastname
        mr_lastname
        birthday
        gender
      }
      dose {
        name
      }
      ref_cel_number
      fc_dosis
      vc {
        name
      }
      riskFactors {
        name
      }
    }
  }
`;

export const getCitizenByDni = gql`
  mutation GetCitizenByDni($birthday: Date!, $dni: String!) {
    getCitizenByDni(input: { birthday: $birthday, dni: $dni }) {
      ... on EntityResult {
        messages
      }
      ... on Citizen {
        names
        fr_lastname
        mr_lastname
        birthday
        gender
        address
        dni
        id
        vaccines {
          id
          fc_dosis
          dose {
            id
            name
          }
          vc {
            id
            name
          }
        }
      }
    }
  }
`;
