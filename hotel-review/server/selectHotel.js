const selectHotel = (text1, rows) => {
  let sendDatas;

  if (text1 == '호텔1') {
    sendDatas = rows.filter((r) => {
      return r.hotel_name == '댄디 호텔 다안 파크 브랜치';
    });
  } else if (text1 == '호텔2') {
    sendDatas = rows.filter((r) => {
      return r.hotel_name == '그랜드 하얏트 타이베이';
    });
  } else {
    sendDatas = rows.filter((r) => {
      return r.hotel_name == '샹그릴라 파 이스턴 플라자 호텔 타이베이';
    });
  }

  return sendDatas;
};

export { selectHotel };
