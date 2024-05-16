document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('appointment-form');
    const appointmentList = document.getElementById('appointment-list');

    // Carrega os agendamentos do LocalStorage ao carregar a página
    loadAppointments();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        const appointment = {
            name,
            email,
            date,
            time
        };

        addAppointment(appointment);
        saveAppointment(appointment);
        form.reset();
    });

    function addAppointment(appointment) {
        const li = document.createElement('li');
        li.textContent = `${appointment.name} - ${appointment.email} - ${appointment.date} - ${appointment.time}`;
        
        // Cria o botão do WhatsApp
        const whatsappButton = document.createElement('button');
        whatsappButton.textContent = 'Enviar pelo WhatsApp';
        whatsappButton.className = 'whatsapp-button';
        whatsappButton.onclick = () => sendToWhatsApp(appointment);

        // Cria o botão de exclusão
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = () => deleteAppointment(li, appointment);

        li.appendChild(whatsappButton);
        li.appendChild(deleteButton);
        appointmentList.appendChild(li);
    }

    function saveAppointment(appointment) {
        let appointments = localStorage.getItem('appointments');
        if (appointments) {
            appointments = JSON.parse(appointments);
        } else {
            appointments = [];
        }
        appointments.push(appointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));
    }

    function loadAppointments() {
        let appointments = localStorage.getItem('appointments');
        if (appointments) {
            appointments = JSON.parse(appointments);
            appointments.forEach(appointment => {
                addAppointment(appointment);
            });
        }
    }

    function sendToWhatsApp(appointment) {
        const phoneNumber = '';  // Insira o número de telefone do seu comércio com o código do país (ex: +5511999999999 para Brasil)
        const message = `Olá, gostaria de confirmar meu agendamento:
        Nome: ${appointment.name}
        Email: ${appointment.email}
        Data: ${appointment.date}
        Hora: ${appointment.time}`;
        
        const whatsappURL = `https://wa.me/${5566}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    }

    function deleteAppointment(li, appointment) {
        li.remove();

        let appointments = JSON.parse(localStorage.getItem('appointments'));
        appointments = appointments.filter(a => JSON.stringify(a) !== JSON.stringify(appointment));
        localStorage.setItem('appointments', JSON.stringify(appointments));
    }
});
