const setInfoModal = (nombre, balance, id) => {
    $("#nombreEdit").val(nombre);
    $("#balanceEdit").val(balance);
    $("#editButton").attr("onclick", `editUsuario('${id}')`);
};

const editUsuario = async (id) => {
    const nombre = $("#nombreEdit").val();
    const balance = $("#balanceEdit").val();
    try {
        const { data } = await axios.put(
            `http://localhost:3000/usuario/${id}`,
            {
                nombre,
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
    let monto = parseFloat($("#monto").val());

    if (!emisor || !receptor || isNaN(monto) || monto <= 0) {
        alert("Debe seleccionar un emisor, receptor y un monto válido a transferir");
        return false;
    }

    try {
        const response = await fetch("http://localhost:3000/transferencia", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emisor,
                receptor,
                monto
            })
        });

        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }

        const data = await response.json();
        location.reload();
    } catch (e) {
        console.log(e);
        alert("Algo salió mal: " + e.message);
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

            opcionesHtml += `<option value="${c.id}">${c.nombre}</option>`;
        });

        $(".usuarios").html(usuariosHtml);
        $("#emisor").html(opcionesHtml);
        $("#receptor").html(opcionesHtml);

    } catch (error) {
        console.error("Hubo un problema con la solicitud Fetch:", error);
    }
};


const eliminarUsuario = async (id) => {
    const response = await fetch(`http://localhost:3000/usuario/${id}`, {
        method: "DELETE",
    });
    getUsuarios();
};

const getTransferencias = async () => {
    try {
        const response2 = await axios.get("http://localhost:3000/usuarios");
        const usuarios = response2.data;
        const response = await axios.get("http://localhost:3000/transferencias");
        const transferencias = response.data;
        $(".transferencias").html("");

        transferencias.forEach((t) => {
            const emisor = usuarios.find((usuario) => usuario.id === t.emisor);
            const receptor = usuarios.find((usuario) => usuario.id === t.receptor);
            $(".transferencias").append(`
                <tr>
                    <td>${formatDate(t.fecha)}</td>
                    <td>${emisor ? emisor.nombre : 'Desconocido'}</td>
                    <td>${receptor ? receptor.nombre : 'Desconocido'}</td>
                    <td>${t.monto}</td>
                </tr>
            `);
        });
    } catch (error) {
        console.error("Error fetching transferencias:", error);
    }
};


getUsuarios();
getTransferencias();

const formatDate = (date) => {
    const dateFormat = moment(date).format("L");
    const timeFormat = moment(date).format("LTS");
    return `${dateFormat} ${timeFormat}`;
};
formatDate();