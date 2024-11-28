import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Joke } from './jokes';

export type RootStackParamList = {
  JokeList: undefined;
  JokeDetail: { joke: Joke };
  EditJoke: { joke?: Joke };
};

export type JokeListScreenProps = NativeStackScreenProps<RootStackParamList, 'JokeList'>;
export type JokeDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'JokeDetail'>;
export type EditJokeScreenProps = NativeStackScreenProps<RootStackParamList, 'EditJoke'>; 