const Event = use('Event')
const Mail = use('Mail')

Event.on('new::user', async (user) => {
    await Mail.send('emails.welcome', user, (message) => {
        message
            .to(user.email)
            .from('john@waysoftware.dev', 'Dishes App')
            .subject('Welcome to Dishes!')
    })
})