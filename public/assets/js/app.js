const setInfoModal = (nombre, balance, id) => {
    $("#nombreEdit").val(nombre);
    $("#balanceEdit").val(balance);
    $("#editButton").attr("onclick", `editUsuario('${id}')`);
};

const editUsuario = async (id) => {
    const name = $("#nombreEdit").val();
    const balance = $("#balanceEdit").val();
    try {
        const { data } = await axios.put(
            `http://localhost:3000/usuario?id=${id}`,
            {
                name,
                balance,
            }
        );
        $("#exampleModal").modal("hide");
        location.reload();
    } catch (e) {
        alert("Algo salió mal..." + e);
    }
};

$("form:first").submit(async (e) => {
    e.preventDefault();
    let nombre = $("form:first input:first").val();
    let balance = Number($("form:first input:nth-child(2)").val());

    if (isNaN(balance)) {
        alert("El balance debe ser un número");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre.trim(),
                balance: balance
            })
        });

        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }

        $("form:first input:first").val("");
        $("form:first input:nth-child(2)").val("");
        location.reload();
    } catch (e) {
        alert("Algo salió mal: " + e.message);
    }
});

$("form:last").submit(async (e) => {
    e.preventDefault();
    let emisor = $("form:last select:first").val();
    let receptor = $("form:last select:last").val();
    let monto = $("#monto").val();
    if (!monto || !emisor || !receptor) {
        alert("Debe seleccionar un emisor, receptor y monto a transferir");
        return false;
    }
    try {
        const response = await fetch("http://localhost:3000/transferencia", {
            method: "post",
            body: JSON.stringify({
                emisor,
                receptor,
                monto,
            }),
        });
        const data = await response.json();
        location.reload();
    } catch (e) {
        console.log(e);
        alert("Algo salió mal..." + e);
    }
});

const getUsuarios = async () => {
    try {
        const response = await fetch("http://localhost:3000/usuarios");
        if (!response.ok) {
            throw new Error("Error al obtener los usuarios");
        }

        const data = await response.json();
        console.log(data)
        let usuariosHtml = '';
        let opcionesHtml = '';

        $.each(data, (i, c) => {
            usuariosHtml += `
                <tr>
                    <td>${c.nombre}</td>
                    <td>${c.balance}</td>
                    <td>
                        <button
                            class="btn btn-warning mr-2"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            onclick="setInfoModal('${c.nombre}', '${c.balance}', '${c.id}')"
                        >
                            Editar
                        </button>
                        <button class="btn btn-danger" onclick="eliminarUsuario('${c.id}')">Eliminar</button>
                    </td>
                </tr>
            `;

            opcionesHtml += `<option value="${c.nombre}">${c.nombre}</option>`;
        });

        $(".usuarios").html(usuariosHtml);
        $("#emisor").html(opcionesHtml);
        $("#receptor").html(opcionesHtml);

    } catch (error) {
        console.error("Hubo un problema con la solicitud Fetch:", error);
    }
};


const eliminarUsuario = async (id) => {
    const response = await fetch(`http://localhost:3000/usuario?id=${id}`, {
        method: "DELETE",
    });
    getUsuarios();
};

const getTransferencias = async () => {
    const { data } = await axios.get("http://localhost:3000/transferencias");
    $(".transferencias").html("");

    data.forEach((t) => {
        $(".transferencias").append(`
       <tr>
         <td> ${formatDate(t[4])} </td>
         <td> ${t[1]} </td>
         <td> ${t[2]} </td>
         <td> ${t[3]} </td>
       </tr>
     `);
    });
};

getUsuarios();
getTransferencias();

const formatDate = (date) => {
    const dateFormat = moment(date).format("L");
    const timeFormat = moment(date).format("LTS");
    return `${dateFormat} ${timeFormat}`;
};
formatDate();