import React, { useState } from 'react';
import { IconButton, Menu } from 'react-native-paper';
import type { EmojiRating as EmojiRatingType } from '../types/jokes';

const EMOJI_RATINGS = [
  { value: 4, icon: 'emoticon-excited-outline', label: 'Hilarious' },
  { value: 3, icon: 'emoticon-happy-outline', label: 'Funny' },
  { value: 2, icon: 'emoticon-neutral-outline', label: 'Okay' },
  { value: 1, icon: 'emoticon-sad-outline', label: 'Not Funny' },
  { value: 0, icon: 'emoticon-dead-outline', label: 'Terrible' },
];

type Props = {
  value?: EmojiRatingType;
  onChange: (rating: EmojiRatingType) => void;
};

export function EmojiRating({ value, onChange }: Props) {
  const [visible, setVisible] = useState(false);
  const currentRating = EMOJI_RATINGS.find(r => r.value === value) ?? EMOJI_RATINGS[2];

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <IconButton
          icon={currentRating.icon}
          size={28}
          onPress={() => setVisible(true)}
        />
      }
    >
      {EMOJI_RATINGS.map((rating) => (
        <Menu.Item
          key={rating.value}
          onPress={() => {
            onChange(rating.value as EmojiRatingType);
            setVisible(false);
          }}
          leadingIcon={rating.icon}
          title={rating.label}
        />
      ))}
    </Menu>
  );
} 