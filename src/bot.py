import discord
from discord import app_commands

from creds import guild_id, bot_token # credentials

MY_GUILD = discord.Object(id=guild_id)  # replace with your guild id
intents = discord.Intents.default()

class Hikari(discord.Client):
    def __init__(self, *, intents: discord.Intents):
        super().__init__(intents=intents)
        # A CommandTree is a special type that holds all the application command
        # state required to make it work. This is a separate class because it
        # allows all the extra state to be opt-in.
        # Whenever you want to work with application commands, your tree is used
        # to store and work with them.
        # Note: When using commands.Bot instead of discord.Client, the bot will
        # maintain its own tree instead.
        self.tree = app_commands.CommandTree(self)

    # In this basic example, we just synchronize the app commands to one guild.
    # Instead of specifying a guild to every command, we copy over our global commands instead.
    # By doing so, we don't have to wait up to an hour until they are shown to the end-user.
    async def setup_hook(self):
        # This copies the global commands over to your guild.
        self.tree.copy_global_to(guild=MY_GUILD)
        print("Settin up hooks")
        await self.tree.sync(guild=MY_GUILD)
        print("Hooks sat up")


hikari = Hikari(intents=intents)

@hikari.event
async def on_ready():
    assert hikari.user is not None
    print(f'Logged in as {hikari.user} (ID: {hikari.user.id})')

@hikari.tree.command()
async def ping(interaction: discord.Interaction):
    """Ping pong!"""
    await interaction.response.send_message("Pong!")
    
# This context menu command only works on members
@hikari.tree.context_menu(name='Show Join Date')
async def show_stats(interaction: discord.Interaction, member: discord.Member):
    assert member.joined_at
    await interaction.response.send_message(f'{member} joined at {discord.utils.format_dt(member.joined_at)}')

hikari.run(bot_token)
