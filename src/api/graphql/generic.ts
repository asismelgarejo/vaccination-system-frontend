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

export const GetVcdCtzsStats = gql`
  query getVcdCtzsStats {
    getVcdCtzsStats {
      women {
        minors
        adults
      }
      men {
        minors
        adults
      }
    }
  }
`;