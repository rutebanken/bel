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

module.exports = [
  {
    "id": 1,
    "name": "Østfold / Østfold Kollektivtrafikk",
    "sftpAccount": "ost",
    "chouetteInfo": {
      "id": 1,
      "xmlns": "OST",
      "xmlnsurl": "http://www.rutebanken.org/ns/ost",
      "referential": "ost",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": "EPSG:32632",
      "regtoppCalendarStrategy": null,
      "dataFormat": "regtopp",
      "enableValidation": true,
      "migrateDataToProvider": 1001
    }
  },
  {
    "id": 2,
    "name": "Oslo og Akershus / Ruter",
    "sftpAccount": "rut",
    "chouetteInfo": {
      "id": 2,
      "xmlns": "RUT",
      "xmlnsurl": "http://www.rutebanken.org/ns/rut",
      "referential": "rut",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": "EPSG:32632",
      "regtoppCalendarStrategy": null,
      "dataFormat": "regtopp",
      "enableValidation": true,
      "migrateDataToProvider": 1002
    }
  },
  {
    "id": 3,
    "name": "Hedmark / Hedmark-Trafikk",
    "sftpAccount": "hed",
    "chouetteInfo": {
      "id": 3,
      "xmlns": "HED",
      "xmlnsurl": "http://www.rutebanken.org/ns/hed",
      "referential": "hed",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": "EPSG:32632",
      "regtoppCalendarStrategy": null,
      "dataFormat": "regtopp",
      "enableValidation": true,
      "migrateDataToProvider": 1003
    }
  },
  {
    "id": 4,
    "name": "Oppland / Opplandstrafikk",
    "sftpAccount": "opp",
    "chouetteInfo": {
      "id": 4,
      "xmlns": "OPP",
      "xmlnsurl": "http://www.rutebanken.org/ns/opp",
      "referential": "opp",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": "EPSG:32632",
      "regtoppCalendarStrategy": null,
      "dataFormat": "regtopp",
      "enableValidation": true,
      "migrateDataToProvider": 1004
    }
  },
  {
    "id": 5,
    "name": "Buskerud / Brakar",
    "sftpAccount": "bra",
    "chouetteInfo": {
      "id": 5,
      "xmlns": "BRA",
      "xmlnsurl": "http://www.rutebanken.org/ns/bra",
      "referential": "bra",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": "EPSG:32632",
      "regtoppCalendarStrategy": null,
      "dataFormat": "regtopp",
      "enableValidation": true,
      "migrateDataToProvider": 1005
    }
  },
  {
    "id": 6,
    "name": "Vestfold / VkT",
    "sftpAccount": "vkt",
    "chouetteInfo": {
      "id": 6,
      "xmlns": "VKT",
      "xmlnsurl": "http://www.rutebanken.org/ns/vkt",
      "referential": "vkt",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": "EPSG:32632",
      "regtoppCalendarStrategy": null,
      "dataFormat": "regtopp",
      "enableValidation": true,
      "migrateDataToProvider": 1006
    }
  },
  {
    "id": 7,
    "name": "Agder / AkT",
    "sftpAccount": "akt",
    "chouetteInfo": {
      "id": 7,
      "xmlns": "AKT",
      "xmlnsurl": "http://www.rutebanken.org/ns/akt",
      "referential": "akt",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": "EPSG:32632",
      "regtoppCalendarStrategy": null,
      "dataFormat": "regtopp",
      "enableValidation": true,
      "migrateDataToProvider": 1007
    }
  },
  {
    "id": 8,
    "name": "Rogaland / Kolumbus",
    "sftpAccount": "kol",
    "chouetteInfo": {
      "id": 8,
      "xmlns": "KOL",
      "xmlnsurl": "http://www.rutebanken.org/ns/kol",
      "referential": "kol",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": "EPSG:32632",
      "regtoppCalendarStrategy": null,
      "dataFormat": "regtopp",
      "enableValidation": true,
      "migrateDataToProvider": 1008
    }
  },
  {
    "id": 9,
    "name": "Hordaland / Skyss",
    "sftpAccount": "sky",
    "chouetteInfo": {
      "id": 9,
      "xmlns": "SKY",
      "xmlnsurl": "http://www.rutebanken.org/ns/sky",
      "referential": "sky",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": null,
      "regtoppCalendarStrategy": null,
      "dataFormat": "gtfs",
      "enableValidation": true,
      "migrateDataToProvider": 1009
    }
  },
  {
    "id": 10,
    "name": "Sogn og Fjordane / Kringom",
    "sftpAccount": "sof",
    "chouetteInfo": {
      "id": 10,
      "xmlns": "SOF",
      "xmlnsurl": "http://www.rutebanken.org/ns/sof",
      "referential": "sof",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": "EPSG:32632",
      "regtoppCalendarStrategy": null,
      "dataFormat": "regtopp",
      "enableValidation": true,
      "migrateDataToProvider": 1010
    }
  },
  {
    "id": 11,
    "name": "Møre og Romsdal / Fram",
    "sftpAccount": "mor",
    "chouetteInfo": {
      "id": 11,
      "xmlns": "MOR",
      "xmlnsurl": "http://www.rutebanken.org/ns/mor",
      "referential": "mor",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": "EPSG:32632",
      "regtoppCalendarStrategy": null,
      "dataFormat": "regtopp",
      "enableValidation": true,
      "migrateDataToProvider": 1011
    }
  },
  {
    "id": 12,
    "name": "Sør-Trøndelag / AtB",
    "sftpAccount": "atb",
    "chouetteInfo": {
      "id": 12,
      "xmlns": "ATB",
      "xmlnsurl": "http://www.rutebanken.org/ns/atb",
      "referential": "atb",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": "EPSG:32632",
      "regtoppCalendarStrategy": null,
      "dataFormat": "regtopp",
      "enableValidation": true,
      "migrateDataToProvider": 1012
    }
  },
  {
    "id": 13,
    "name": "Nord-Trøndelag",
    "sftpAccount": "ntr",
    "chouetteInfo": {
      "id": 13,
      "xmlns": "NTR",
      "xmlnsurl": "http://www.rutebanken.org/ns/ntr",
      "referential": "ntr",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": "EPSG:32632",
      "regtoppCalendarStrategy": null,
      "dataFormat": "regtopp",
      "enableValidation": true,
      "migrateDataToProvider": 1013
    }
  },
  {
    "id": 14,
    "name": "Nordland",
    "sftpAccount": "nor",
    "chouetteInfo": {
      "id": 14,
      "xmlns": "NOR",
      "xmlnsurl": "http://www.rutebanken.org/ns/nor",
      "referential": "nor",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": "EPSG:4326",
      "regtoppCalendarStrategy": null,
      "dataFormat": "regtopp",
      "enableValidation": true,
      "migrateDataToProvider": 1014
    }
  },
  {
    "id": 15,
    "name": "Troms / Troms Fylkestrafikk",
    "sftpAccount": "tro",
    "chouetteInfo": {
      "id": 15,
      "xmlns": "TRO",
      "xmlnsurl": "http://www.rutebanken.org/ns/tro",
      "referential": "tro",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": "EPSG:32633",
      "regtoppCalendarStrategy": null,
      "dataFormat": "regtopp",
      "enableValidation": true,
      "migrateDataToProvider": 1015
    }
  },
  {
    "id": 16,
    "name": "Finnmark / Snelandia",
    "sftpAccount": "fin",
    "chouetteInfo": {
      "id": 16,
      "xmlns": "FIN",
      "xmlnsurl": "http://www.rutebanken.org/ns/fin",
      "referential": "fin",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": "EPSG:32633",
      "regtoppCalendarStrategy": null,
      "dataFormat": "regtopp",
      "enableValidation": true,
      "migrateDataToProvider": 1016
    }
  },
  {
    "id": 17,
    "name": "NSB",
    "sftpAccount": "nsb",
    "chouetteInfo": {
      "id": 17,
      "xmlns": "NSB",
      "xmlnsurl": "http://www.rutebanken.org/ns/nsb",
      "referential": "nsb",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": "EPSG:4326",
      "regtoppCalendarStrategy": null,
      "dataFormat": "gtfs",
      "enableValidation": true,
      "migrateDataToProvider": 1017
    }
  },
  {
    "id": 18,
    "name": "Telemark",
    "sftpAccount": "tel",
    "chouetteInfo": {
      "id": 18,
      "xmlns": "TEL",
      "xmlnsurl": "http://www.rutebanken.org/ns/tel",
      "referential": "tel",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": "EPSG:32632",
      "regtoppCalendarStrategy": null,
      "dataFormat": "regtopp",
      "enableValidation": true,
      "migrateDataToProvider": 1018
    }
  },
  {
    "id": 19,
    "name": "Norsk ReiseInformasjon",
    "sftpAccount": "nri",
    "chouetteInfo": {
      "id": 19,
      "xmlns": "NRI",
      "xmlnsurl": "http://www.rutebanken.org/ns/nri",
      "referential": "nri",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": null,
      "regtoppCalendarStrategy": null,
      "dataFormat": "gtfs",
      "enableValidation": true,
      "migrateDataToProvider": 1019
    }
  },
  {
    "id": 20,
    "name": "NOR-WAY Bussekspress",
    "sftpAccount": "nwy",
    "chouetteInfo": {
      "id": 20,
      "xmlns": "NWY",
      "xmlnsurl": "http://www.rutebanken.org/ns/nwy",
      "referential": "nwy",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": null,
      "regtoppCalendarStrategy": null,
      "dataFormat": "regtopp",
      "enableValidation": true,
      "migrateDataToProvider": 1020
    }
  },
  {
    "id": 21,
    "name": "Avinor",
    "sftpAccount": null,
    "chouetteInfo": {
      "id": 21,
      "xmlns": "AVI",
      "xmlnsurl": "http://www.rutebanken.org/ns/avi",
      "referential": "avi",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": null,
      "regtoppCalendarStrategy": null,
      "dataFormat": "netexprofile",
      "enableValidation": true,
      "migrateDataToProvider": 1021
    }
  },
  {
    "id": 22,
    "name": "Flytoget",
    "sftpAccount": "flt",
    "chouetteInfo": {
      "id": 22,
      "xmlns": "FLT",
      "xmlnsurl": "http://www.rutebanken.org/ns/flt",
      "referential": "flt",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": "EPSG:4326",
      "regtoppCalendarStrategy": null,
      "dataFormat": "gtfs",
      "enableValidation": true,
      "migrateDataToProvider": 1022
    }
  },
  {
    "id": 23,
    "name": "Test Organisasjon 1",
    "sftpAccount": "test1",
    "chouetteInfo": {
      "id": 23,
      "xmlns": "TSTEN",
      "xmlnsurl": "http://www.rutebanken.org/ns/tsten",
      "referential": "test1",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": "EPSG:4326",
      "regtoppCalendarStrategy": null,
      "dataFormat": "gtfs",
      "enableValidation": true,
      "migrateDataToProvider": 1023
    }
  },
  {
    "id": 24,
    "name": "Test Organisasjon 2",
    "sftpAccount": "test2",
    "chouetteInfo": {
      "id": 24,
      "xmlns": "TSTTO",
      "xmlnsurl": "http://www.rutebanken.org/ns/tstto",
      "referential": "test2",
      "organisation": "Rutebanken",
      "user": "admin@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": "EPSG:4326",
      "regtoppCalendarStrategy": null,
      "dataFormat": "gtfs",
      "enableValidation": true,
      "migrateDataToProvider": 1024
    }
  },
  {
    "id": 1001,
    "name": "RB/Østfold / Østfold Kollektivtrafikk",
    "sftpAccount": null,
    "chouetteInfo": {
      "id": 1001,
      "xmlns": "OST",
      "xmlnsurl": "http://www.rutebanken.org/ns/ost",
      "referential": "rb_ost",
      "organisation": "Rutebanken",
      "user": "admin+ost@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": null,
      "regtoppCalendarStrategy": null,
      "dataFormat": "neptune",
      "enableValidation": true,
      "migrateDataToProvider": null
    }
  },
  {
    "id": 1002,
    "name": "RB/Oslo og Akershus / Ruter",
    "sftpAccount": null,
    "chouetteInfo": {
      "id": 1002,
      "xmlns": "RUT",
      "xmlnsurl": "http://www.rutebanken.org/ns/rut",
      "referential": "rb_rut",
      "organisation": "Rutebanken",
      "user": "admin+rut@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": null,
      "regtoppCalendarStrategy": null,
      "dataFormat": "neptune",
      "enableValidation": true,
      "migrateDataToProvider": null
    }
  },
  {
    "id": 1003,
    "name": "RB/Hedmark / Hedmark-Trafikk",
    "sftpAccount": null,
    "chouetteInfo": {
      "id": 1003,
      "xmlns": "HED",
      "xmlnsurl": "http://www.rutebanken.org/ns/hed",
      "referential": "rb_hed",
      "organisation": "Rutebanken",
      "user": "admin+hed@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": null,
      "regtoppCalendarStrategy": null,
      "dataFormat": "neptune",
      "enableValidation": true,
      "migrateDataToProvider": null
    }
  },
  {
    "id": 1004,
    "name": "RB/Oppland / Opplandstrafikk",
    "sftpAccount": null,
    "chouetteInfo": {
      "id": 1004,
      "xmlns": "OPP",
      "xmlnsurl": "http://www.rutebanken.org/ns/opp",
      "referential": "rb_opp",
      "organisation": "Rutebanken",
      "user": "admin+opp@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": null,
      "regtoppCalendarStrategy": null,
      "dataFormat": "neptune",
      "enableValidation": true,
      "migrateDataToProvider": null
    }
  },
  {
    "id": 1005,
    "name": "RB/Buskerud / Brakar",
    "sftpAccount": null,
    "chouetteInfo": {
      "id": 1005,
      "xmlns": "BRA",
      "xmlnsurl": "http://www.rutebanken.org/ns/bra",
      "referential": "rb_bra",
      "organisation": "Rutebanken",
      "user": "admin+bra@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": null,
      "regtoppCalendarStrategy": null,
      "dataFormat": "neptune",
      "enableValidation": true,
      "migrateDataToProvider": null
    }
  },
  {
    "id": 1006,
    "name": "RB/Vestfold / VkT",
    "sftpAccount": null,
    "chouetteInfo": {
      "id": 1006,
      "xmlns": "VKT",
      "xmlnsurl": "http://www.rutebanken.org/ns/vkt",
      "referential": "rb_vkt",
      "organisation": "Rutebanken",
      "user": "admin+vkt@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": null,
      "regtoppCalendarStrategy": null,
      "dataFormat": "neptune",
      "enableValidation": true,
      "migrateDataToProvider": null
    }
  },
  {
    "id": 1007,
    "name": "RB/Agder / AkT",
    "sftpAccount": null,
    "chouetteInfo": {
      "id": 1007,
      "xmlns": "AKT",
      "xmlnsurl": "http://www.rutebanken.org/ns/akt",
      "referential": "rb_akt",
      "organisation": "Rutebanken",
      "user": "admin+akt@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": null,
      "regtoppCalendarStrategy": null,
      "dataFormat": "neptune",
      "enableValidation": true,
      "migrateDataToProvider": null
    }
  },
  {
    "id": 1008,
    "name": "RB/Rogaland / Kolumbus",
    "sftpAccount": null,
    "chouetteInfo": {
      "id": 1008,
      "xmlns": "KOL",
      "xmlnsurl": "http://www.rutebanken.org/ns/kol",
      "referential": "rb_kol",
      "organisation": "Rutebanken",
      "user": "admin+kol@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": null,
      "regtoppCalendarStrategy": null,
      "dataFormat": "neptune",
      "enableValidation": true,
      "migrateDataToProvider": null
    }
  },
  {
    "id": 1009,
    "name": "RB/Hordaland / Skyss",
    "sftpAccount": null,
    "chouetteInfo": {
      "id": 1009,
      "xmlns": "SKY",
      "xmlnsurl": "http://www.rutebanken.org/ns/sky",
      "referential": "rb_sky",
      "organisation": "Rutebanken",
      "user": "admin+sky@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": null,
      "regtoppCalendarStrategy": null,
      "dataFormat": "neptune",
      "enableValidation": true,
      "migrateDataToProvider": null
    }
  },
  {
    "id": 1010,
    "name": "RB/Sogn og Fjordane / Kringom",
    "sftpAccount": null,
    "chouetteInfo": {
      "id": 1010,
      "xmlns": "SOF",
      "xmlnsurl": "http://www.rutebanken.org/ns/sof",
      "referential": "rb_sof",
      "organisation": "Rutebanken",
      "user": "admin+sof@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": null,
      "regtoppCalendarStrategy": null,
      "dataFormat": "neptune",
      "enableValidation": true,
      "migrateDataToProvider": null
    }
  },
  {
    "id": 1011,
    "name": "RB/Møre og Romsdal / Fram",
    "sftpAccount": null,
    "chouetteInfo": {
      "id": 1011,
      "xmlns": "MOR",
      "xmlnsurl": "http://www.rutebanken.org/ns/mor",
      "referential": "rb_mor",
      "organisation": "Rutebanken",
      "user": "admin+mor@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": null,
      "regtoppCalendarStrategy": null,
      "dataFormat": "neptune",
      "enableValidation": true,
      "migrateDataToProvider": null
    }
  },
  {
    "id": 1012,
    "name": "RB/Sør-Trøndelag / AtB",
    "sftpAccount": null,
    "chouetteInfo": {
      "id": 1012,
      "xmlns": "ATB",
      "xmlnsurl": "http://www.rutebanken.org/ns/atb",
      "referential": "rb_atb",
      "organisation": "Rutebanken",
      "user": "admin+atb@rutebanken.org",
      "regtoppVersion": null,
      "regtoppCoordinateProjection": null,
      "regtoppCalendarStrategy": null,
      "dataFormat": "neptune",
      "enableValidation": true,
      "migrateDataToProvider": null
    }
  },
]