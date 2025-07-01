export function validateFetchResponse(response, functionName = '') {
  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response?.status ?? '응답없음'} ${response.statusText} - ${functionName}`);
  }
}

export function handleAxiosError(error, functionName = '') {
  if (error) {
    console.log(`${functionName} 에러:`,
      error?.response?.status || '네트워크 오류',
      error.message || '에러 메세지 없음'
    );
  }
}

const errorHandler = {
  validateFetchResponse,
  handleAxiosError,
}

export default errorHandler;