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

/* Async Actions */
export const REQUESTED_EVENTS = 'REQUESTED_EVENTS';
export const RECEIVED_EVENTS = 'RECEIVED_EVENTS';
export const ERROR_EVENTS = 'ERROR_EVENTS';

export const REQUESTED_SUPPLIERS = 'REQUESTED_SUPPLIERS';
export const RECEIVED_SUPPLIERS = 'RECEIVED_SUPPLIERS';
export const ERROR_SUPPLIERS = 'ERROR_SUPPLIERS';

export const REQUESTED_LINE_STATS = 'REQUESTED_LINE_STATS';
export const RECEIVED_LINE_STATS = 'RECEIVED_LINE_STATS';
export const UPDATED_FILE_UPLOAD_PROGRESS_BAR =
  'UPDATED_FILE_UPLOAD_PROGRESS_BAR';
export const UPDATED_FILE_UPLOAD_PROGRESS_BAR_STATE =
  'UPDATED_FILE_UPLOAD_PROGRESS_BAR_STATE';

export const REQUESTED_LATEST_DELIVERY_DATE = 'REQUESTED_LATEST_DELIVERY_DATE';
export const RECEIVED_LATEST_DELIVERY_DATE = 'RECEIVED_LATEST_DELIVERY_DATE';

/* User actions */
export const DISMISSED_FILEUPLOAD_MODAL = 'DISMISSED_FILEUPLOAD_MODAL';
export const OPENED_FILEUPLOAD_MODAL = 'OPENED_FILEUPLOAD_MODAL';
export const CHANGED_ACTIVE_PROVIDER = 'CHANGED_ACTIVE_PROVIDER';
export const USER_NO_ORGANISATIONS = 'USER_NO_ORGANISATIONS';
export const DISMISSED_SNACKBAR = 'DISMISSED_SNACKBAR';

/* file upload status */
export const FILE_UPLOAD_NOT_STARTED = 'FILE_UPLOAD_NOT_STARTED';
export const FILE_UPLOAD_UPLOADING = 'FILE_UPLOAD_UPLOADING';
export const FILE_UPLOAD_COMPLETED = 'FILE_UPLOAD_COMPLETED';
export const FILE_UPLOAD_FAILED = 'FILE_UPLOAD_FAILED';

/* validate actions */
export const REQUESTED_VALIDATE_DATASET = 'REQUESTED_VALIDATE_DATASET';
export const SUCCESS_VALIDATE_DATASET = 'SUCCESS_VALIDATE_DATASET';
export const ERROR_VALIDATE_DATASET = 'ERROR_VALIDATE_DATASET';

/* snackbar status */
export const STATUS_ERROR = 'STATUS_ERROR';
export const STATUS_SUCCESS = 'STATUS_SUCCESS';
