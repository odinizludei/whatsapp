import { Chats } from './collections/chats';
import { Messages } from './collections/messages';
import { Events } from './collections/events';
import { Comments } from './collections/comments';
import { MessageType, Profile, Event, Comment } from './models';
import { check, Match } from 'meteor/check';

const nonEmptyString = Match.Where((str) => {
  check(str, String);
  return str.length > 0;
});

Meteor.methods({
  addChat(receiverId: string): void {
    if (!this.userId) {
      throw new Meteor.Error('unauthorized',
        'User must be logged-in to create a new chat');
    }

    check(receiverId, nonEmptyString);

    if (receiverId === this.userId) {
      throw new Meteor.Error('illegal-receiver',
        'Receiver must be different than the current logged in user');
    }

    const chatExists = !!Chats.collection.find({
      memberIds: { $all: [this.userId, receiverId] }
    }).count();

    if (chatExists) {
      throw new Meteor.Error('chat-exists',
        'Chat already exists');
    }

    const chat = {
      memberIds: [this.userId, receiverId]
    };

    Chats.insert(chat);
  },
  removeChat(chatId: string): void {
    if (!this.userId) {
      throw new Meteor.Error('unauthorized',
        'User must be logged-in to remove chat');
    }

    check(chatId, nonEmptyString);

    const chatExists = !!Chats.collection.find(chatId).count();

    if (!chatExists) {
      throw new Meteor.Error('chat-not-exists',
        'Chat doesn\'t exist');
    }

    Chats.remove(chatId);
  },
  updateProfile(profile: Profile): void {
    if (!this.userId) throw new Meteor.Error('unauthorized',
      'User must be logged-in to create a new chat');

    check(profile, {
      name: nonEmptyString,
      pictureId: Match.Maybe(nonEmptyString),
      description: Match.Maybe(nonEmptyString)
    });

    Meteor.users.update(this.userId, {
      $set: {profile}
    });
  },
  addMessage(type: MessageType, chatId: string, content: string) {
    if (!this.userId) throw new Meteor.Error('unauthorized',
      'User must be logged-in to create a new chat');

    check(type, Match.OneOf(String, [ MessageType.TEXT, MessageType.LOCATION ]));
    check(chatId, nonEmptyString);
    check(content, nonEmptyString);

    const chatExists = !!Chats.collection.find(chatId).count();

    if (!chatExists) {
      throw new Meteor.Error('chat-not-exists',
        'Chat doesn\'t exist');
    }

    return {
      messageId: Messages.collection.insert({
        chatId: chatId,
        senderId: this.userId,
        content: content,
        createdAt: new Date(),
        type: type
      })
    };
  },
  countMessages(): number {
    return Messages.collection.find().count();
  },
  addEvent(event: Event): void {
    if (!this.userId) {
      throw new Meteor.Error('unauthorized',
        'User must be logged-in to create a new event');
    }

    check(event.creatorId, nonEmptyString);
    check(event.name, nonEmptyString);

    if (event.creatorId === this.userId) {
       Events.insert(event);
    }
  },
  updateEvent(event: Event): void {
    if (!this.userId) throw new Meteor.Error('unauthorized',
        'User must be logged-in to update event');

    check(event.name, nonEmptyString);

    if (event.creatorId === this.userId) {
      Events.update({_id : event._id},{ $set: {name : event.name, description: event.description, pictureId: event.pictureId, picture: event.picture, dateStart: event.dateStart, dateEnd: event.dateEnd}});
    }
  },
  addComment(comment: Comment): void {
    if (!this.userId) {
      throw new Meteor.Error('unauthorized',
        'User must be logged-in to create a new comment');
    }

    check(comment.creatorId, nonEmptyString);
    check(comment.text, nonEmptyString);

    if (comment.creatorId === this.userId) {
       Comments.insert(comment);
    }
  },
  deleteComment(commentId: string, commentCreatorId: string): void {
    if (!this.userId) {
      throw new Meteor.Error('unauthorized',
        'User must be logged-in to delete comment');
    }

    check(commentId, nonEmptyString);
    check(commentCreatorId, nonEmptyString);

    if (commentCreatorId === this.userId) {
       Comments.remove({_id: commentId});
    }
  },
  countComments(eventId: string): number {
    return Comments.collection.find({docId: eventId}).count();
  },
  subscribeEvent(eventId: string): void {
    if (!this.userId) {
      throw new Meteor.Error('unauthorized',
        'User must be logged-in to subscribe');
    }
    
    check(eventId, nonEmptyString);
    
    Events.collection.update({_id: eventId}, { $push: { subscribers: this.userId } });
  },
  unsubscribeEvent(eventId: string): void {
    if (!this.userId) {
      throw new Meteor.Error('unauthorized',
        'User must be logged-in to subscribe');
    }
    
    check(eventId, nonEmptyString);
    
    Events.collection.update({_id: eventId}, { $pull: { subscribers: this.userId, iGoSubscribers: this.userId } });
  },
  iGoSubscribeEvent(eventId: string): void {
    if (!this.userId) {
      throw new Meteor.Error('unauthorized',
        'User must be logged-in to subscribe');
    }
    
    check(eventId, nonEmptyString);
    
    Events.collection.update({_id: eventId}, { $push: { iGoSubscribers: this.userId } });
  },
  iGoUnsubscribeEvent(eventId: string): void {
    if (!this.userId) {
      throw new Meteor.Error('unauthorized',
        'User must be logged-in to subscribe');
    }
    
    check(eventId, nonEmptyString);
    
    Events.collection.update({_id: eventId}, { $pull: { iGoSubscribers: this.userId } });
  }
});
