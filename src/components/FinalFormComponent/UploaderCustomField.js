import PropTypes from "prop-types"
import { memo } from "react"
import { Uploader } from "rsuite"
import {
  AUDIO_FILE_ACCEPT_ATTRIBUTE,
  DEFAULT_ACCEPT_ATTRIBUTE,
  DOWNLOAD_FILE_API_URL,
  EXCEL_FILE_ACCEPT_ATTRIBUTE,
  IMAGE_FILE_ACCEPT_ATTRIBUTE,
  PDF_FILE_ACCEPT_ATTRIBUTE,
  PLAIN_TEXT_FILE_ACCEPT_ATTRIBUTE,
  UPLOAD_API_URL,
  VIDEO_FILE_ACCEPT_ATTRIBUTE,
  WORD_FILE_ACCEPT_ATTRIBUTE,
} from "~/utils/commonConst"
import {
  checkIsArray,
  checkIsFunction,
  checkIsString,
  convertStringToArray,
  getAcceptAttribute,
} from "~/utils/commonObj"
import { TEXT_ERROR_TITLE } from "~/utils/commonText"
import AttachmentFile from "../common/AttachmentFile"
import openNotification from "../UI Components/Notification"
import CustomField from "./CustomField"

function checkIsValidFile(acceptItem, fileType) {
  if (
    (acceptItem === WORD_FILE_ACCEPT_ATTRIBUTE && acceptItem.includes(fileType)) ||
    (acceptItem === EXCEL_FILE_ACCEPT_ATTRIBUTE && acceptItem.includes(fileType)) ||
    (acceptItem === PDF_FILE_ACCEPT_ATTRIBUTE && acceptItem.includes(fileType)) ||
    (acceptItem === PLAIN_TEXT_FILE_ACCEPT_ATTRIBUTE && acceptItem.includes(fileType)) ||
    (acceptItem === IMAGE_FILE_ACCEPT_ATTRIBUTE && fileType.includes("image/")) ||
    (acceptItem === VIDEO_FILE_ACCEPT_ATTRIBUTE && fileType.includes("video/")) ||
    (acceptItem === AUDIO_FILE_ACCEPT_ATTRIBUTE && fileType.includes("audio/"))
  ) {
    return true
  } else {
    return false
  }
}

UploaderCustomField.propTypes = {
  input: PropTypes.object,
  accept: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  inputstyle: PropTypes.object,
  inputclassname: PropTypes.string,
}
function UploaderCustomField(props) {
  // props
  const {
    input,
    accept: acceptAttribute = DEFAULT_ACCEPT_ATTRIBUTE,
    inputstyle,
    inputclassname,
    ...rest
  } = props
  const { value = "" } = input

  let fileList = []
  if (checkIsString(value)) {
    const valueArr = convertStringToArray(value)

    // fileName: hiển thị tên file ở danh sách file của uploader
    // url: đường dẫn download file
    fileList = valueArr.map((item) => ({
      fileName: item,
      fileKey: item,
      url: `${DOWNLOAD_FILE_API_URL}${item}`,
    }))
  } else {
    fileList = value
  }

  return (
    <CustomField
      {...input}
      style={inputstyle}
      className={inputclassname}
      accepter={Uploader}
      accept={getAcceptAttribute(acceptAttribute)}
      action={UPLOAD_API_URL}
      fileList={fileList}
      renderFileInfo={(file) => {
        return (
          <AttachmentFile.Item key={file}>
            <AttachmentFile.Info>
              <a href={`${DOWNLOAD_FILE_API_URL}${file.fileName}`}>{file.fileName}</a>
            </AttachmentFile.Info>
          </AttachmentFile.Item>
        )
      }}
      onChange={(files) => {
        const validFiles = files.filter((file) => {
          // file(s) vừa mới được upload
          if (file.status === "inited") {
            const { blobFile = {} } = file
            const { type: fileType = null } = blobFile

            let isValidFile
            if (checkIsArray(acceptAttribute)) {
              isValidFile = acceptAttribute.some((acceptItem) =>
                checkIsValidFile(acceptItem, fileType)
              )
            } else {
              isValidFile = checkIsValidFile(acceptAttribute, fileType)
            }

            if (!isValidFile) {
              openNotification(
                "error",
                TEXT_ERROR_TITLE,
                "File không đúng định dạng. Vui lòng chọn lại."
              )
            }

            return isValidFile
          }
          // file(s) đã có sẵn trong db
          else {
            return true
          }
        })

        input.onChange(validFiles)
        if (checkIsFunction(props.onChangeFile)) props.onChangeFile(validFiles)
      }}
      {...rest}
    />
  )
}

export default memo(UploaderCustomField)
