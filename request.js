exports.get = () => {
  fetch();
};

exports.post = (url, data, ASPXAUTH) => {
  return new Promise((resolve, reject) => {
    const requestOptions = setRequestOption(data,ASPXAUTH);
    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => resolve(result))
      .catch((error) => resolve(error));
  });
};



const setRequestOption = (data,ASPXAUTH) => {
  var headers = new Headers();
  headers.append("Cookie", `.ASPXAUTH=${ASPXAUTH}`);
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  var params = new URLSearchParams();
  params.append("request_type", data.request_type);
  params.append("roomdm", data.roomdm);
  params.append("start_date", data.start_date);

  return {
    method: "POST",
    body: params,
    redirect: "follow",
    headers: headers,
  };
};
