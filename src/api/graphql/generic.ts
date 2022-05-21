import { gql } from "@apollo/client";

export const GetAllRFs = gql`
  query getAllRFs {
    getAllRFs {
      id
      name
      code
    }
  }
`;
export const GetAllVCs = gql`
  query getAllVCs {
    getAllVCs {
      id
      name
      code
    }
  }
`;
export const GetAllDoses = gql`
  query getAllDoses {
    getAllDoses {
      id
      name
      code
    }
  }
`;
