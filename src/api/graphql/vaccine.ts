import { gql } from "@apollo/client";

export const RegisterVaccineSchema = gql`
  mutation RegisterVaccine(
    $userId: ID!
    $doseId: ID!
    $vcId: ID!
    $citizenId: ID!
    $ref_cel_number: String!
    $rFactorIds: [String!]!
    $fc_dosis: Date
  ) {
    registerVaccine(
      input: {
        userId: $userId
        doseId: $doseId
        vcId: $vcId
        citizenId: $citizenId
        ref_cel_number: $ref_cel_number
        fc_dosis: $fc_dosis
        rFactorIds: $rFactorIds
      }
    ) {
      messages
    }
  }
`;
