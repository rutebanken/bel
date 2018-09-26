/*
 * Licensed under the EUPL, Version 1.2 or – as soon they will be approved by
 * the European Commission - subsequent versions of the EUPL (the "Licence");
 * You may not use this work except in compliance with the Licence.
 * You may obtain a copy of the Licence at:
 *
 *   https://joinup.ec.europa.eu/software/page/eupl
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the Licence is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Licence for the specific language governing permissions and
 * limitations under the Licence.
 *
 */

export default {
  text: {
    FILE_TRANSFER: "Filoverføring",
    IMPORT: "Import",
    EXPORT: "GTFS Eksport",
    EXPORT_NETEX: "NeTEx Eksport",
    VALIDATION_LEVEL_1: "Validering nivå 1",
    DATASPACE_TRANSFER: "Overføring sentral database",
    VALIDATION_LEVEL_2: "Validering nivå 2",
    BUILD_GRAPH: "Bygg av reisesøkforslag",
    UNKNOWN: "Ukjent steg",
  },
  title: {
    FILE_TRANSFER: "Overføring av fil fra lokal maskin til sentral server",
    IMPORT: "Filvalidering og import i lokalt databaseområde nivå 1",
    EXPORT: "Eksport av rutedata ",
    VALIDATION_LEVEL_1: "Validering av komplett dataområde nivå 1",
    VALIDATION_LEVEL_2: "Validering av komplett dataområde nivå 2",
    DATASPACE_TRANSFER: "Overføring til sentralt databaseområde nivå 2",
    BUILD_GRAPH: "Bygg av reisesøkforslag",
    UNKNOWN: "Dette steget er ukjent",
  },
  filename: {
    undefined: "Direkteleveranse"
  },
  states: {
    OK: "Fullført",
    PENDING: "Venter",
    STARTED: "Påbegynt",
    FAILED: "Feil",
    DUPLICATE: "Feil - duplikat datasett",
    IGNORED: "Ikke gjennomført"
  }
}

