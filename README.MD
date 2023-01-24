# Monthly Theme Tracker Discord Bot
### Why did I create this bot?
I am in a discord server with a friends and family. We have been using this discord server for a few years and randomly decided to do monthly themes. Originally this meant that we would just change our display avatar, display banner, and display name. We originally chose the theme based on different holidays that month. An example of a theme was Jazz Appreciation Month in April. Each member who decided to participate would pick a random Jazz artist in time and change their avatar, banner, and name. This extends to other Holidays in each month. Over time we started to forget what holidays we had already done and who we had chosen to be our avatars. Now, we choose random themes each month. This Discord bot will take a "snapshot" of each participant's information and keep a record of the theme of the month. Over time we can look back at the history of avatars and themes. Eventually I will add the ability to vote on who picked the funniest, most clever, or other some other description of the month. Sort of like an "employee of the month" but for monthly themes.

## What happens with this bot?
- Bot creates new category for bot to only be concerned about
- Bot creates new channels needed for this bot's communication
- Bot creates new roles for participants and will eventually add for admin roles
- Bot Introduces itself and how it works
- Explain each command as well

### Establish participants
- Sends a message with an emoji for users to react to (checkmark)
  - If a user reacts to the emoji, the user gets assigned a role (Monthly Theme Bot - Participant)
  - If a user un-reacts to the emoji, the user gets the role removed

## Commands
- /snapshot:
  - Requires month name & year
    - Month & year can be options provided in the command
  - Gets members with the role 'monthly-theme-participant' (probably an array)
  - Create a collection (array) of embedded messages
    - Each embedded message will have the members display name, avatar (could be img or gif), and display banner (NOT AVAILABLE IN API YET)
    - Add userId to embedded message to ensure no duplicate messages exist
  - Reply/Send message with array of embedded messages (could loop through each embed and send each individual. Can I send 1 message with a bunch of embeds? Oooh or maybe just have a thread with each embedded message!)
  - OPTIONAL: Check message history if Month & year has already been used. If so, ask if you would like to replace old snapshot message(s)/thread

- /replace-current-member-snapshot:
  - Requires member
  - Get member info
  - Find message in current month & year thread with member snapshot and delete message
  - Send message in current month & year thread with new member snapshot

- /add-new-member-snapshot:
  - Requires member
  - Check to make sure user is not already in thread for current month & year snapshot
  - If not in current month & year thread, add a new snapshot in thread with new user

- /remove-current-snapshot:
  - Requires member & whoever sent the message to have a specific role as monthly-theme-bot-admin
    - Role check to ensure not just everyone can delete people's snapshot
  - Check current month thread for member snapshot
    - If member does not exist in snapshot, reply ephemeral message with member is not in current month snapshot thread
    - Else, remove snapshot in current thread and send message stating (user who sent command) has removed a snapshot for x month

- /remove-previous-snapshot:
  - Requires member, role check, and month & year
  - Check month and year thread for snapshot
    - If member does not exist in snapshot, reply ephemeral message with member is not in current month snapshot thread
    - Else, remove snapshot in current thread and send message stating (user who sent command) has removed a snapshot for x month

## Goals:
- Assign role to participants
- Command when to take a snapshot of members with role
- Record snapshot of each participant
- Have a history of snapshots tied to each month or user
- Ability to recall history of either user, theme, or month
- Voting capabilities
- End Voting and announce award
- Ensure that no more than 1 copy of snapshots per month per user

## Required:
- discord.js
- eslint rules
- VERSION 1: Only send messages/threads with member information
- VERSION 2: Connect database to store these snapshots and history

## Lessons learned during development:
- Enable eslint Rules and customize rules
- Create and use config.json file for token security
- Separation of concerns. Events trigger imported functions that use imported models.
- Refactoring of code to be more readable
- Better understanding of how to deal with promises
